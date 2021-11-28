
export default function newValidator(data) {
  if(!data) {
    data = {}
  }

  return {data, isValid: true, messages: []}
}
