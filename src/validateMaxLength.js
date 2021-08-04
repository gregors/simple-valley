import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateMaxLength(v, fields, options) {
  const { message, max } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), max))
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} over max length`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'length_max',  message }
}

function invalid(value, max) {
  return value.length > max
}
