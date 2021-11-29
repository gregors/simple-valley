
export default function newValidator(data) {
  if(!data) {
    data = {}
  }

  return {data, isValid: true, messages: []}
}

export function updateValidator(v, messages) {
  v.messages = v.messages.concat(messages)
  const valid = messages.length == 0
  v.isValid = v.isValid && valid

  return v
}
