import { addMessage } from './message.js'
import updateValidator from './updateValidator.js'
import { dig } from './dig.js'

export default function validateIsNumber(v, fields, options) {
  const { message='{key} is not a number' } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field)))
    .map(field => addMessage(field, message, 'is_number'))

  return updateValidator(v, messages)
}

function invalid(value) {
  return typeof value != 'number'
}
