import { formatMessage } from './messageFormatter'

export default function validateNumber(v, fields, options) {
  const { message, max } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
     const value = v.data[field]

     if(max && invalidMax(max, value)) {
       v.messages.push(addMaxMessage(field, message))
       return false
     }

     return true
  })

  v.isValid = v.isValid && valid

  return v
}

function addMaxMessage(field, customMessage) {
  const defaultMessage = `${field} too large`
  const message = formatMessage(field, defaultMessage, customMessage)

  return { field, type: 'number_max',  message }
}

function invalidMax(max, value) {
  return value > max
}
