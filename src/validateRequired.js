import { addMessage } from './message.js'
import { updateValidator } from './validator.js'
import { dig } from './dig.js'

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
    .map(field => addMessage(field, message, 'required'))

  return updateValidator(v, messages)
}

function invalid(data, field) {
  return !Object.prototype.hasOwnProperty.call(data, field)
}
