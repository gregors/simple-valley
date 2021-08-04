export function dig(obj, keys) {
  return keys
    .split('.')
    .reduce((acc, key) => acc[key], obj)
}
