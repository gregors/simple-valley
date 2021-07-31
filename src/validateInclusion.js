import { formatMessage } from './messageFormatter'

function check(value, choices) {
  return choices.some(c => c == value)
}

export default function validateInclusion(v, fields, options) {
  const { message, choices=[] } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = v.messages

  const valid = fields.every(field => {
    const value = v.data[field]

    if(check(value, choices)) {
      return true
    }

    v.messages.push(addMessage(field, value, message))
    return false
  })

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, value, customMessage) {
  const defaultMessage = `${value} is not a choice`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'inclusion',  message }
}

