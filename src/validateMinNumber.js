import { formatMessage } from './messageFormatter'

export default function validateMinNumber(v, fields, options) {
  const { message, min } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
     const value = v.data[field]

     if(invalid(min, value)) {
       v.messages.push(addMessage(field, message))
       return false
     }

     return true
  })

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} too small`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'number_min',  message }
}

function invalid(min, value) {
  return value < min
}
