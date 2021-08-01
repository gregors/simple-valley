import { formatMessage } from './messageFormatter'

export default function validateUrl(v, fields, options) {
  const { message } = options || {}

  const messages = [fields]
    .flatMap(x => x)
    .filter(field => invalid(v.data[field]))
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = 'invalid url'
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'invalid_url',  message }
}

function invalid(url) {
  try{
    new URL(url)
    return false
  }catch{
    return true
  }
}
