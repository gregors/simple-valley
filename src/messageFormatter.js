export function formatMessage(field, defaultMessage, custom) {
  return custom ? custom.replace('{key}', field) : defaultMessage
}
