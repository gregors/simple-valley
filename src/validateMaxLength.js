import { addMessage } from './message'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateMaxLength(v, fields, options) {
  const { message='{key} over max length', max } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), max))
    .map(field => addMessage(field, message, 'length_max'))

  return updateValidator(v, messages)
}

function invalid(value, max) {
  return value.length > max
}
