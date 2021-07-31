import { formatMessage } from './messageFormatter'

function check(value, choices) {
  return choices.some(c => c == value)
}

export default function validateInclusion(v, fields, options) {
  const { message, choices=[] } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = fields
    .filter(field => !check(v.data[field], choices) )
    .map(field => addMessage(field, v.data[field], message) )

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

