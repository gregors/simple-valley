import { addMessage } from './message.js'
import updateValidator from './updateValidator.js'
import { dig } from './dig.js'

export default function validateMaxNumber(v, fields, options) {
  const { message='{key} too large', max } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), max))
    .map(field => addMessage(field, message, 'number_max'))

  return updateValidator(v, messages)
}

function invalid(value, max) {
  if(isNaN(value) || isNaN(max)) return true
  return value > max
}
