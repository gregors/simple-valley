import validateMaxLength from './validateMaxLength'
import validateMinLength from './validateMinLength'

export default function validateLength(v, fields, options) {
  const { message, max, min } = options || {}

  if(max) {
    v = validateMaxLength(v, fields, options)
  }

  if(min) {
    v = validateMinLength(v, fields, options)
  }

  return v
}
