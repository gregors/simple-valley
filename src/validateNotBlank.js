import { formatMessage } from './messageFormatter'

export default function validateNotBlank(v, fields, options) {
  const { message } = options || {}

  const messages = [fields]
    .flatMap(x => x)
    .filter(field => blank(v.data[field]))
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} blank`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'blank',  message }
}

function blank(data) {
  const  whitespce = /^\s*$/
  if(!Boolean(data) && data != 0) return true
  if(whitespce.test(data)) return true

  return false
}
