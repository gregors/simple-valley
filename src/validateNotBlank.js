import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateNotBlank(v, fields, options) {
  const { message } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => blank(dig(v.data, field)))
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
