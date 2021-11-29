import { addMessage } from './message'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateFormat(v, fields, options) {
  const { withFormat,
    message='{key} is invalid',
    type='format' } = options || {}

  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data,field), withFormat))
    .map(field => addMessage(field, message, type))

  return updateValidator(v, messages)
}

function invalid(data, format) {
  return !format.test(data)
}
