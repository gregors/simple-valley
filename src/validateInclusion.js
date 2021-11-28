import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateInclusion(v, fields, options) {
  const { message, choices=[] } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field), choices))
    .map(field => addMessage(field, dig(v.data, field), message) )

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, value, customMessage) {
  const defaultMessage = `${value} is not a choice`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'inclusion',  message }
}

function invalid(value, choices) {
  return !choices.some(c => c == value)
}

