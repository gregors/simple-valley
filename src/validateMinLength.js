import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateMinLength(v, fields, options) {
  const { message, min } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), min))
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} not min length`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'length_min',  message }
}

function invalid(value, min) {
  return value.length < min
}
