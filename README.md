# Simple Validations for objects

## List of validations
* validateRequired
* validateNotBlank
* validateEmail
* validateNumber
* validateInclusion


### validateRequired

```javascript
  let validator = newValidator({title: undefined })
  validator = validateRequired(validator, 'title')
  validator.isValid // true

  let validator = newValidator({t})
  validator = validateRequired(validator, 'title')
  validator.isValid // false
  validator.messages[0] // { field: 'title', type: 'required', message: 'title required' }
```

### validateNotBlank

```javascript
let validator = newValidator({title: 'hello' })
validator = validateNotBlank(validator, 'title')
validator.isValid // true

let validator = newValidator({title: '' })
validator = validateNotBlank(validator, 'title')
validator.isValid // false
validator.messages[0] // { field: 'title', type: 'blank', message: 'title blank' }
```
