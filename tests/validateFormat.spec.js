import newValidator from '@/validator'
import validateFormat from '@/validateFormat'

describe('validateFormat', () => {
  describe('withFormat subkeys', () => {
    it('validates', () => {
      let validator = newValidator({person: { name: 'gregors' }})
      validator = validateFormat(validator, 'person.name', { withFormat: /[a-zA-Z]+/ })

      expect(validator.isValid).toBe(true)
    })
  })

  describe('is immutable', () => {
    it('doesnt change previous validator', () => {
      const validator = newValidator({name: '12345' })
      const validator2 = validateFormat(validator, 'name', { withFormat: /[a-zA-Z]+/ })

      expect(validator.isValid).toBe(true)
      expect(validator.messages.length).toBe(0)
      expect(validator2.isValid).toBe(false)
      expect(validator2.messages.length).toBe(1)
    })
  })

  describe('using withFormat', () => {
    describe('valid format', () => {

      it('sets isValid to true', () => {
        let validator = newValidator({name: 'gregors' })
        validator = validateFormat(validator, 'name', { withFormat: /[a-zA-Z]+/ })

        expect(validator.isValid).toBe(true)
      })
    })

    describe('withFormat invalid format', () => {

      it('sets isValid to false', () => {
        let validator = newValidator({name: '123' })
        validator = validateFormat(validator, 'name', { withFormat: /[a-zA-Z]+/ })

        expect(validator.isValid).toBe(false)
      })

      it('adds message', () => {
        let validator = newValidator({name: '123' })
        validator = validateFormat(validator, 'name', { withFormat: /[a-zA-Z]+/ })

        expect(validator.messages.length).toBe(1)
        expect(validator.messages[0].message).toEqual('name is invalid')
        expect(validator.messages[0].field).toEqual('name')
        expect(validator.messages[0].type).toEqual('format')
      })

      describe('withFormat custom message', () => {
        it('adds message', () => {
          let validator = newValidator({name: '123' })
          validator = validateFormat(validator, 'name', { withFormat: /[a-zA-Z]+/, message: 'try again' })

          expect(validator.messages.length).toBe(1)
          expect(validator.messages[0].message).toEqual('try again')
        })
      })
    })
  })
})
