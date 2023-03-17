import { addMessage } from './message.js'
import updateValidator from './updateValidator.js'
import { dig } from './dig.js'

export default function validateInclusion(v, fields, options) {
  const { message='{key} is not a valid choice', choices=[] } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), choices))
    .map(field => customMessage(field, dig(v.data,field), message))

  return updateValidator(v, messages)
}

function customMessage(field, data, message) {
  message = addMessage(data, message, 'inclusion')
  message.field = field

  return message
}

function invalid(value, choices) {
  return !choices.some(c => c == value)
}

