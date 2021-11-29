import { formatMessage } from './messageFormatter'
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

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, message, type) {
  message = formatMessage(field, message)

  return { field, type,  message }
}

function invalid(data, format) {
  return !format.test(data)
}
