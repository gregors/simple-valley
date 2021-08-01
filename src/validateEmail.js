import { formatMessage } from './messageFormatter'

export default function validateEmail(v, fields, options) {
  const { message } = options || {}

  const messages = [fields]
    .flatMap(x => x)
    .filter(field => invalid(v.data[field]) )
    .map(field => addMessage(field, message) )

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = 'invalid email'
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'invalid_email',  message }
}

function invalid(data) {
  const regex = new RegExp('^\\S+@\\S+\.\\S+$')
  return !regex.test(data)
}
