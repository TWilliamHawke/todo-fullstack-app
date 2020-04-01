import Axios from 'axios'
import * as tokenjs from './token'

jest.mock('axios')

describe('refresh token function', () => {
  const response = {
    data: { token: 'someToken' }
  }
  let newToken
  
  beforeAll(async () => {
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(JSON, 'stringify').mockImplementation(() => 'tokenData')
    Axios.post.mockResolvedValue(response)
    newToken = await tokenjs.refreshToken('testRefToken')
  })

  afterAll(() => {
    localStorage.setItem.mockRestore()
    JSON.stringify.mockRestore()
  })

  it('should return token', () => {
    expect(newToken).toBe('someToken')
  })

  it('should call axios', () => {
    expect(Axios.post).toBeCalledTimes(1)
    expect(Axios.post.mock.calls[0][1]).toEqual({refToken: 'testRefToken'})
  })

  it('should call JSON.stringify', () => {
    expect(JSON.stringify).toBeCalled()
    expect(JSON.stringify.mock.calls[0][0]).toEqual({token: 'someToken'})
  })

  it('should call localStorage.setItem', () => {
    expect(localStorage.setItem).toBeCalled()
    expect(localStorage.setItem.mock.calls[0][1]).toBe('tokenData')
  })
})

//=============================
//Second test

describe('get token function', () => {
  const storageTokens = {
    token: 'oldToken',
    refToken: 'refToken',
    tokenDie: 42
  }
  let testStorageData = 'testStorageData'

  beforeAll(() => {
    jest.spyOn(JSON, 'parse').mockImplementation(() => storageTokens)
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => testStorageData)
    jest.spyOn(Date, 'now').mockImplementation(() => 42)
  })

  afterAll(() => {
    JSON.parse.mockRestore()
    localStorage.getItem.mockRestore()
    Date.now.mockRestore()
  })

  it('should call localStorage', async () => {
    await tokenjs.getToken()
    expect(localStorage.getItem).toBeCalled()
    expect(localStorage.getItem.mock.calls[0][0]).toBe('tokens')
  })

  it('should call json.parse', async() => {
    await tokenjs.getToken()
    expect(JSON.parse).toBeCalled()
    expect(JSON.parse.mock.calls[0][0]).toBe('testStorageData')
  })

  it('should call date.now', async() => {
    await tokenjs.getToken()
    expect(Date.now).toBeCalled()
  })

  describe('test getToken if token not die (date.now < tokenDie)', () => {
    let token
    beforeAll(async () => {
      storageTokens.tokenDie = 100
      token = await tokenjs.getToken()
      jest.spyOn(tokenjs, 'refreshToken')
    })

    it('should return old token', () => {
      expect(token).toBe('Bearer oldToken')
    })

    it('shouldnt call refreshToken function', () => {
      expect(tokenjs.refreshToken).not.toBeCalled()
    })
  })

  describe('test function if token was die (date.now > tokenDie', () => {
    let token
    beforeAll(async () => {
      storageTokens.tokenDie = 10
      jest.spyOn(tokenjs, 'refreshToken').mockImplementation(() => 'newToken')

      token = await tokenjs.getToken()
    })

    it('should return new token', () => {
      expect(token).toBe('Bearer newToken')
    })

    it('shoul call refreshToken function', () => {
      expect(tokenjs.refreshToken).toBeCalled()
      expect(tokenjs.refreshToken.mock.calls[0][0]).toBe('refToken')
    })

  })

  describe('function should trow error if loacalStorage return undefined', () => {
    beforeAll(() => {
      testStorageData = undefined
    })

    it('should throw error with correct error message', async () => {
      await expect(tokenjs.getToken()).rejects.toThrowError('you hasnt tokens')
    })
  })
})