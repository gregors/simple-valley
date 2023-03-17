import { addMessage } from './message.js'
import updateValidator from './updateValidator.js'
import { dig } from './dig.js'

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
