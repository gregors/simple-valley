import { addMessage } from './message'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateMinLength(v, fields, options) {
  const { message='{key} not min length', min } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), min))
    .map(field => addMessage(field, message, 'length_min'))

  return updateValidator(v, messages)
}

function invalid(value, min) {
  return value.length < min
}
