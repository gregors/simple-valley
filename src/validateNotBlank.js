export default function validateNotBlank(v, fields) {
  fields = [fields].flatMap(x => x)
  const messages = v.messages

   const valid = fields.every(field => {
     if(blank(v.data[field])) {
       v.messages.push(addMessage(field))
       return false
     }

     return true
  })

  v.isValid = v.isValid && valid

  return v
}

function addMessage(field) {
  return {field, type: 'blank',  message: `${field} blank` }
}

function blank(data) {
  if(!Boolean(data)) return true
  if(!Boolean(data.trim())) return true

  return false
}
