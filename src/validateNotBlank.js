import { formatMessage } from './messageFormatter'
import { updateValidator } from './validator'
import { dig } from './dig'

export default function validateNotBlank(v, fields, options) {
  const { message='{key} blank' } = options || {}
  v = Object.assign({}, v)

  const messages = [fields]
    .flat()
    .filter(field => blank(dig(v.data, field)))
    .map(field => addMessage(field, message))

  return updateValidator(v, messages)
}

function addMessage(field, message) {
  message = formatMessage(field, message)

  return { field, type: 'blank',  message }
}

function blank(data) {
  const  whitespce = /^\s*$/
  if(!data && data != 0) return true
  if(whitespce.test(data)) return true

  return false
}
