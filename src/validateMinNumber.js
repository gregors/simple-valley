import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateMinNumber(v, fields, options) {
  const { message='{key} too small', min } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), min))
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, message) {
  message = formatMessage(field, message)

  return { field, type: 'number_min',  message }
}

function invalid(value, min) {
  if(isNaN(value) || isNaN(min)) return true
  return value < min
}
