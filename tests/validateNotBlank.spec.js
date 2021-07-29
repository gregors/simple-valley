import newValidator from '@/validator'
import validateNotBlank from '@/validateNotBlank'

describe('validateNotBlank', () => {
  describe('with valid data', () => {
    describe('with a number', () => {
      it('sets isValid to true', () => {
        let validator = newValidator({age: 0 })

        validator = validateNotBlank(validator, 'age')

        expect(validator.isValid).toBe(true)
      })
    })

    it('sets isValid to true', () => {
      let validator = newValidator({title: 'hello' })

      validator = validateNotBlank(validator, 'title')

      expect(validator.isValid).toBe(true)
    })

    it('doesnt add message', () => {
      let validator = newValidator({title: 'hello' })
      expect(validator.messages.length).toBe(0)

      validator = validateNotBlank(validator, 'title')

      expect(validator.messages.length).toBe(0)
    })
  })

  describe('with invalid data', () => {

    it('with empty string sets isValid to false', () => {
      let validator = newValidator({title: ''})
      validator = validateNotBlank(validator, 'title')
      expect(validator.isValid).toBe(false)
    })

    it('with null sets isValid to false', () => {
      let validator = newValidator({title: null})
      validator = validateNotBlank(validator, 'title')
      expect(validator.isValid).toBe(false)
    })

    it('with whitespace sets isValid to false', () => {
      let validator = newValidator({title: '  '})
      validator = validateNotBlank(validator, 'title')
      expect(validator.isValid).toBe(false)
    })

    it('adds message', () => {
      let validator = newValidator({title: ''})
      expect(validator.messages.length).toBe(0)
      validator = validateNotBlank(validator, 'title')

      expect(validator.messages.length).toBe(1)
      expect(validator.messages[0].message).toEqual('title blank')
      expect(validator.messages[0].field).toEqual('title')
      expect(validator.messages[0].type).toEqual('blank')
    })

    describe('with custom message', () => {
      it('adds message', () => {
        let validator = newValidator({title: ''})
        expect(validator.messages.length).toBe(0)
        validator = validateNotBlank(validator, 'title', { message: '{key} is missing' })

        expect(validator.messages.length).toBe(1)
        expect(validator.messages[0].message).toEqual('title is missing')
        expect(validator.messages[0].field).toEqual('title')
        expect(validator.messages[0].type).toEqual('blank')
      })
    })

  })
})
