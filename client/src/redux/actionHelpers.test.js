import { transformErrors } from './actionHelpers'

describe('auth  failure function', () => {
  it('should return correct array without error messages', () => {
    expect(transformErrors('foo', 'testAction')).toEqual(
      ["Server is not aviable"])
  })

  it('should return correct payload with error array', () => {
    expect(transformErrors({errors: [1, 2, 3]}, 'testAction').length).toBe(3)
  })

  it('should return correct payload with error messages', () => {
    expect(transformErrors({message: 'test message'}, 'testAction')[0]).toBe('test message')
  })
})