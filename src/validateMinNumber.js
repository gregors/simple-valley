import { addMessage } from './message'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateMinNumber(v, fields, options) {
  const { message='{key} too small', min } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), min))
    .map(field => addMessage(field, message, 'number_min'))

  return updateValidator(v, messages)
}

function invalid(value, min) {
  if(isNaN(value) || isNaN(min)) return true
  return value < min
}
