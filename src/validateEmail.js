import validateFormat from './validateFormat'

export default function validateEmail(v, fields, options) {
  const { message='invalid email' } = options || {}
  const regex = new RegExp('^\\S+@\\S+.\\S+$')
  const type = 'invalid_email'
  v = validateFormat(v, fields, { withFormat: regex, message, type })

  return v
}
