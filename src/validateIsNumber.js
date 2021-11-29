import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateIsNumber(v, fields, options) {
  const { message='{key} is not a number' } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data,field)))
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, message) {
  message = formatMessage(field, message)

  return { field, type: 'is_number',  message }
}

function invalid(value) {
  return typeof value != 'number'
}
