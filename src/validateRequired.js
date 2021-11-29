import { formatMessage } from './messageFormatter'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateRequired(v, fields, options) {
  const { message='{key} required' } = options || {}
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

  return updateValidator(v, messages)
}

function invalid(data, field) {
  return !Object.prototype.hasOwnProperty.call(data, field)
}

function addMessage(field, message) {
  message = formatMessage(field, message)
  return {field, type: 'required',  message }
}
