export const authValidator = (loading, password, email) => {
  return loading || password.length < 5 || email.length < 5
}