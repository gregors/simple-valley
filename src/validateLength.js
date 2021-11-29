import validateMaxLength from './validateMaxLength'
import validateMinLength from './validateMinLength'

export default function validateLength(v, fields, options) {
  const { max, min } = options || {}
  v = Object.assign({}, v)

  if(max !== undefined && max !== null) {
    v = validateMaxLength(v, fields, options)
  }

  if(min !== undefined && min !== null) {
    v = validateMinLength(v, fields, options)
  }

  return v
}
