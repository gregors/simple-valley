import { formatMessage } from './messageFormatter'
import { dig } from './dig'

export default function validateRequired(v, fields, options) {
  const { message } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => {
      const keys = field.split('.')
      const key = keys[keys.length - 1]
      const data = keys.length > 1 ? dig(v.data, keys[0]) :  v.data
      return invalid(data, key)
    })
    .map(field => addMessage(field, message))

  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}

function invalid(data, field) {
  return !Object.prototype.hasOwnProperty.call(data, field)
}

function addMessage(field, customMessage) {
  const defaultMessage = `${field} required`
  const message = formatMessage(field, defaultMessage, customMessage)
  return {field, type: 'required',  message }
}
