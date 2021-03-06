import validateMaxNumber from './validateMaxNumber'
import validateMinNumber from './validateMinNumber'
import validateIsNumber from './validateIsNumber'

export default function validateNumber(v, fields, options) {
  const { max, min } = options || {}
  v = Object.assign({}, v)

  v = validateIsNumber(v, fields, options)

  if(max !== undefined && max !== null) {
    v = validateMaxNumber(v, fields, options)
  }

  if(min !== undefined && min !== null) {
    v = validateMinNumber(v, fields, options)
  }

  return v
}

