import newValidator from '@/validator'
import validateEmail from '@/validateEmail'

describe('validateEmail', () => {
  describe('with subkeys', () => {
    it('validates', () => {
      let validator = newValidator({person: { email: 'gregors@example.com' }})
      validator = validateEmail(validator, 'person.email')

      expect(validator.isValid).toBe(true)
    })
  })

  describe('is immutable', () => {
    it('doesnt change previous validator', () => {
      const validator = newValidator({email: 'gregors' })
      const validator2 = validateEmail(validator, 'email')

      expect(validator.isValid).toBe(true)
      expect(validator.messages.length).toBe(0)
      expect(validator2.isValid).toBe(false)
      expect(validator2.messages.length).toBe(1)
    })
  })

  describe('with valid email', () => {

    it('sets isValid to true', () => {
      let validator = newValidator({email: 'gregors@example.com' })
      validator = validateEmail(validator, 'email')

      expect(validator.isValid).toBe(true)
    })

    it('sets isValid to true', () => {
      let validator = newValidator({email: 'gregors+w00t@example.com' })
      validator = validateEmail(validator, 'email')

      expect(validator.isValid).toBe(true)
    })

    it('sets isValid to true', () => {
      let validator = newValidator({email: 'greg.ors@example.com' })
      validator = validateEmail(validator, 'email')

      expect(validator.isValid).toBe(true)
    })
  })

  describe('with invalid url', () => {

    it('sets isValid to false', () => {
      let validator = newValidator({email: 'gregors' })
      validator = validateEmail(validator, 'email')

      expect(validator.isValid).toBe(false)
    })

    it('adds message', () => {
      let validator = newValidator({email: 'gregors' })
      validator = validateEmail(validator, 'email')

      expect(validator.messages.length).toBe(1)
      expect(validator.messages[0].message).toEqual('invalid email')
      expect(validator.messages[0].field).toEqual('email')
      expect(validator.messages[0].type).toEqual('invalid_email')
    })

    describe('with custom message', () => {
      it('adds message', () => {
        let validator = newValidator({email: 'gregors' })
        validator = validateEmail(validator, 'email', { message: 'try again' })

        expect(validator.messages.length).toBe(1)
        expect(validator.messages[0].message).toEqual('try again')
      })
    })
  })
})
