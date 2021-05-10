import { formatMessage } from './messageFormatter'

export default function validateRequired(v, fields, options) {
  const { message } = options || {}

  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
    if(v.data.hasOwnProperty(field)) return true

    v.messages.push(addRequiredMessage(field, message))
    return false
  })

  v.isValid = v.isValid && valid

  return v
}

function addRequiredMessage(field, customMessage) {
  const defaultMessage = `${field} required`
  const message = formatMessage(field, defaultMessage, customMessage)
  return {field, type: 'required',  message }
}
