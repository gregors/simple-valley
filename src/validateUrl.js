import { addMessage } from './message.js'
import updateValidator from './updateValidator.js'
import { dig } from './dig.js'

export default function validateUrl(v, fields, options) {
  const { message='invalid url' } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => invalid(dig(v.data, field)))
    .map(field => addMessage(field, message, 'invalid_url'))

  return updateValidator(v, messages)
}

function invalid(url) {
  try{
    new URL(url)
    return false
  }catch{
    return true
  }
}
