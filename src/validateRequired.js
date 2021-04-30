export default function validateRequired(v, fields) {
  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
    if(v.data.hasOwnProperty(field)) return true

    v.messages.push(addRequiredMessage(field))
    return false
  })

  v.isValid = v.isValid && valid

  return v
}

function addRequiredMessage(field) {
  return {field, type: 'required',  message: `${field} required` }
}
