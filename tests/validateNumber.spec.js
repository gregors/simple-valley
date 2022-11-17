import newValidator from '../src/validator'
import validateNumber from '../src/validateNumber'

describe('validateNumber', () => {
  describe('with a non-number', () => {
    it('sets isValid to false', () => {
      let validator = newValidator({age: '0' })

      validator = validateNumber(validator, 'age')

      expect(validator.isValid).toBe(false)
    })
  })

  describe('with subkeys', () => {
    it('validates', () => {
      let validator = newValidator({person: {age: 0 } })

      validator = validateNumber(validator, 'person.age', {min: 0, max: 5})

      expect(validator.isValid).toBe(true)
    })
  })

  describe('is immutable', () => {
    it('doesnt change previous validator', () => {
      const validator = newValidator({age: 6 })
      const validator2 = validateNumber(validator, 'age', {max: 5})

      expect(validator.isValid).toBe(true)
      expect(validator2.isValid).toBe(false)
    })
  })

  describe('with max option', () => {
    describe('with valid data', () => {
      it('sets isValid to true', () => {
        let validator = newValidator({age: 0 })

        validator = validateNumber(validator, 'age', {max: 5})

        expect(validator.isValid).toBe(true)
      })
    })

    describe('with invalid data', () => {
      it('sets isValid to false', () => {
        let validator = newValidator({age: 6 })

        validator = validateNumber(validator, 'age', {max: 5})

        expect(validator.isValid).toBe(false)
      })
    })
  })

  describe('with min option', () => {
    describe('with valid data', () => {
      it('sets isValid to true', () => {
        let validator = newValidator({age: 5 })

        validator = validateNumber(validator, 'age', {min: 5})

        expect(validator.isValid).toBe(true)
      })
    })

    describe('with invalid data', () => {
      it('sets isValid to false', () => {
        let validator = newValidator({age: 4 })

        validator = validateNumber(validator, 'age', {min: 5})

        expect(validator.isValid).toBe(false)
      })
    })
  })
})

