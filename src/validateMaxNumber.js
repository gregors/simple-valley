import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateMaxNumber(v, fields, options) {
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
  const defaultMessage = `${field} too large`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'number_max',  message }
}

function invalid(value, max) {
  if(isNaN(value) || isNaN(max)) return true
  return value > max
}
