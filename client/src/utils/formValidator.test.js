import {authValidator} from './formValidator'

describe('authvalidator test', () => {
  test('when loading is false', () => {
    expect(authValidator(false, 'qwerty', 'qwerty')).toBe(false)
  })
  
  test('when password is too short', () => {
    expect(authValidator(false, 'q', 'qwerty')).toBe(true)
  })
  
  test('when email is too short', () => {
    expect(authValidator(false, 'qwerty', 'q')).toBe(true)
  })
  
  test('when loading is false', () => {
    expect(authValidator(true, 'qwerty', 'qwerty')).toBe(true)
  })
})

