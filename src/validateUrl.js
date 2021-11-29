import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateUrl(v, fields, options) {
  const { message='invalid url' } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field)))
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, message) {
  message = formatMessage(field, message)

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
