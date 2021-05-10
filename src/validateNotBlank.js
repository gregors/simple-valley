import { formatMessage } from './messageFormatter'

export default function validateNotBlank(v, fields, options) {
  const { message } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
     if(blank(v.data[field])) {
       v.messages.push(addMessage(field, message))
       return false
     }

     return true
  })

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} blank`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'blank',  message }
}

function blank(data) {
  if(!Boolean(data)) return true
  if(!Boolean(data.trim())) return true

  return false
}
