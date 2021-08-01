import { formatMessage } from './messageFormatter'

export default function validateIsNumber(v, fields, options) {
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
  const defaultMessage = `${field} is not a number`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'number_nan',  message }
}

function invalid(value) {
  return typeof value != 'number'
}
