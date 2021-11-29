import { formatMessage } from './messageFormatter'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateMinLength(v, fields, options) {
  const { message='{key} not min length', min } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), min))
    .map(field => addMessage(field, message))

  return updateValidator(v, messages)
}

function addMessage(field, message) {
  message = formatMessage(field, message)

  return { field, type: 'length_min',  message }
}

function invalid(value, min) {
  return value.length < min
}
