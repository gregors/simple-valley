import { formatMessage } from './messageFormatter'

export default function validateEmail(v, field, options) {
  const { message } = options || {}

  const valid = isEmail(v.data[field])

  if(!valid) {
    v.messages.push(addMessage(field, message))
  }

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = 'invalid email'
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'invalid_email',  message }
}

function isEmail(data) {
  const regex = new RegExp('^\\S+@\\S+\.\\S+$')
  return regex.test(data)
}
