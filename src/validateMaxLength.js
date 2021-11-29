import { formatMessage } from './messageFormatter'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateMaxLength(v, fields, options) {
  const { message='{key} over max length', max } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), max))
    .map(field => addMessage(field, message))

  return updateValidator(v, messages)
}

function addMessage(field, message) {
  message = formatMessage(field, message)

  return { field, type: 'length_max',  message }
}

function invalid(value, max) {
  return value.length > max
}
