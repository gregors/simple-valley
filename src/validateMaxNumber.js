import { formatMessage } from './messageFormatter'

export default function validateMaxNumber(v, fields, options) {
  const { message, max } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
     const value = v.data[field]

     if(max && invalid(max, value)) {
       v.messages.push(addMessage(field, message))
       return false
     }

     return true
  })

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} too large`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'number_max',  message }
}

function invalid(max, value) {
  return value > max
}
