import { formatMessage } from './messageFormatter'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateInclusion(v, fields, options) {
  const { message='{key} is not a valid choice', choices=[] } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), choices))
    .map(field => addMessage(field, dig(v.data,field), message))

  return updateValidator(v, messages)
}

function addMessage(field, data, message) {
  message = formatMessage(data, message)

  return { field, type: 'inclusion',  message }
}

function invalid(value, choices) {
  return !choices.some(c => c == value)
}

