import newValidator from '@/validator'
import validateNumber from '@/validateNumber'

describe('validateNumber', () => {
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
})

