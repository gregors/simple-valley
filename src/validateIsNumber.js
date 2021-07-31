import { formatMessage } from './messageFormatter'

export default function validateIsNumber(v, fields, options) {
  const { message } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
     const value = v.data[field]

     if(invalid(value)) {
       v.messages.push(addMessage(field, message))
       return false
     }

     return true
  })

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} is not a number`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'number_nan',  message }
}

function invalid(value) {
  return typeof value != 'number'
}
