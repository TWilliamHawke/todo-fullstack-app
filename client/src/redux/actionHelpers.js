export const transformErrors = (data) => {
  let payload = ['Server is not aviable']

  if(data.errors) {
    payload = data.errors.map(error => error.msg)
  } else if (data.message) {
    payload = [data.message]
  }

  return payload
}