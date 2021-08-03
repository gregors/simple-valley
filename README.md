# Simple Validations for objects

## List of validations
* [validateRequired](#validateRequired)
* [validateNotBlank](#validateNotBlank)
* [validateEmail](#validateEmail)
* [validateNumber](#validateNumber)
* [validateInclusion](#validateInclusion)
* [validateUrl](#validateUrl)
* [validateLength](#validateLength)


### validateRequired

  Validates that the object contains the required key. Says nothing about the value of the key(currently).

```javascript
  let validator = newValidator({title: undefined })
  validator = validateRequired(validator, 'title')
  validator.isValid // true

  let validator = newValidator({})
  validator = validateRequired(validator, 'title')
  validator.isValid // false
  validator.messages[0] // { field: 'title', type: 'required', message: 'title required' }
```

### validateNotBlank

  Validates that the field contains a non-whitespace string. Numbers return valid. Null's return invalid.

```javascript
let validator = newValidator({title: 'hello' })
validator = validateNotBlank(validator, 'title')
validator.isValid // true

let validator = newValidator({title: '' })
validator = validateNotBlank(validator, 'title')
validator.isValid // false
validator.messages[0] // { field: 'title', type: 'blank', message: 'title blank' }
```

### validateEmail

  Validates using a simplistic non-complete check for email.

```javascript
let validator = newValidator({email: 'gregors@example.com' })
validator = validateEmail(validator, 'email')
validator.isValid // true

let validator = newValidator({email: 'gregors' })
validator = validateEmail(validator, 'email')
validator.isValid // false
validator.messages[0] // { field: 'title', type: 'invalid_email', message: 'invalid email' }
```

### validateNumber

  Validates the field is a number with options for min and max values.

```javascript
let validator = newValidator({age: 7 })
validator = validateNumber(validator, 'age', {min: 4, max: 7})
validator.isValid // true

let validator = newValidator({age: 8 })
validator = validateNumber(validator, 'age', {min: 4, max: 7})
validator.isValid // false
validator.messages[0] // { field: 'title', type: 'number_max', message: 'age too large' }
```

### validateInclusion

  Validates the field's value is one of the provided choices.

```javascript
let validator = newValidator({title: 'EMPLOYEE' })
validator = validateInclusion(validator, 'title', { choices: ['EMPLOYEE', 'MANAGER']})
validator.isValid // true

let validator = newValidator({title: 'CONTRACTOR' })
validator = validateInclusion(validator, 'title', { choices: ['EMPLOYEE', 'MANAGER']})
validator.isValid // false
validator.messages[0] // { field: 'title', type: 'inclusiont', message: 'CONTRACTOR is not a choice' }
```

### validateUrl
  Validates that the field contains a valid URL.

```javascript
let validator = newValidator({url: 'https://github.com/gregors' })
validator = validateUrl(validator, 'url')
validator.isValid // true

let validator = newValidator({url: 'https/github.com/gregors' })
validator = validateUrl(validator, 'url')
validator.isValid // false
validator.messages[0] // { field: 'url', type: 'invalid_url', message: 'invalid url' }
```

### validateLength
  Validates the field by calling the '.length' method and comparing it with the provided min and max options.

```javascript
let validator = newValidator({name: 'gregors' })
validator = validateLength(validator, 'name', {min: 4, max: 20})
validator.isValid // true

let validator = newValidator({scores: ['0', '100', '50'] })
validator = validateLength(validator, 'scores', {min: 4})
validator.isValid // false
validator.messages[0] // { field: 'scores', type: 'length_min', message: 'scores not min length ' }
```
