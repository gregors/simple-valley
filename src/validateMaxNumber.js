import { formatMessage } from './messageFormatter'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateMaxNumber(v, fields, options) {
  const { message='{key} too large', max } = options || {}

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), max))
    .map(field => addMessage(field, message))

  return updateValidator(v, messages)
}

function addMessage(field, message) {
  message = formatMessage(field, message)

  return { field, type: 'number_max',  message }
}

function invalid(value, max) {
  if(isNaN(value) || isNaN(max)) return true
  return value > max
}
