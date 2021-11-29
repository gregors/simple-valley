export function addMessage(field, message, type) {
  message =  message.replace('{key}', field)

  return { field, type,  message }
}
