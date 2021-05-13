import { formatMessage } from './messageFormatter'

export default function validateUrl(v, field, options) {
  const { message } = options || {}
  let valid = true

  if(!validUrl(v.data[field])) {
    v.messages.push(addMessage(field, message))
    valid = false
  }

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = 'invalid url'
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'invalid_url',  message }
}

function validUrl(url) {
  try{
    new URL(url)
    return true
  }catch{
    return false
  }
}
