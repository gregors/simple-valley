import newValidator from '@/validator'
import validateLength from '@/validateLength'

describe('validateLength', () => {
  describe('with subkeys', () => {
    it('validates', () => {
      let validator = newValidator({test: {scores: ['0', '100', '50'] }})

      validator = validateLength(validator, 'test.scores', {min: 2})

      expect(validator.isValid).toBe(true)
    })
  })

  describe('is immutable', () => {
    it('doesnt change previous validator', () => {
      const validator = newValidator({scores: ['0', '100', '50'] })
      const validator2 = validateLength(validator, 'scores', {min: 4})

      expect(validator.isValid).toBe(true)
      expect(validator2.isValid).toBe(false)
    })
  })

  describe('with an array ', () => {
    describe('with with valid data', () => {
      it('sets isValid to true', () => {
        let validator = newValidator({scores: ['0', '100', '50'] })

        validator = validateLength(validator, 'scores', {min: 2})

        expect(validator.isValid).toBe(true)
      })
    })

    describe('with with invalid data', () => {
      it('sets isValid to true', () => {
        let validator = newValidator({scores: ['0', '100', '50'] })

        validator = validateLength(validator, 'scores', {min: 4})

        expect(validator.isValid).toBe(false)
      })
    })
  })

  describe('with max option', () => {
    describe('with valid data', () => {
      it('sets isValid to true', () => {
        let validator = newValidator({score: '100' })

        validator = validateLength(validator, 'score', {max: 3})

        expect(validator.isValid).toBe(true)
      })
    })

    describe('with invalid data', () => {
      it('sets isValid to false', () => {
        let validator = newValidator({score: '100' })

        validator = validateLength(validator, 'score', {max: 2})

        expect(validator.isValid).toBe(false)
      })

      it('adds message', () => {
        let validator = newValidator({score: '100' })

        validator = validateLength(validator, 'score', {max: 2})

        expect(validator.messages.length).toBe(1)
        expect(validator.messages[0].message).toEqual('score over max length')
        expect(validator.messages[0].field).toEqual('score')
        expect(validator.messages[0].type).toEqual('length_max')
      })
    })
  })

  describe('with min option', () => {
    describe('with valid data', () => {
      it('sets isValid to true', () => {
        let validator = newValidator({score: '100' })

        validator = validateLength(validator, 'score', {min: 2})

        expect(validator.isValid).toBe(true)
      })
    })

    describe('with invalid data', () => {
      it('sets isValid to false', () => {
        let validator = newValidator({score: '100'})

        validator = validateLength(validator, 'score', {min: 4})

        expect(validator.isValid).toBe(false)
      })

      it('adds message', () => {
        let validator = newValidator({score: '100' })

        validator = validateLength(validator, 'score', {min: 4})

        expect(validator.messages.length).toBe(1)
        expect(validator.messages[0].message).toEqual('score not min length')
        expect(validator.messages[0].field).toEqual('score')
        expect(validator.messages[0].type).toEqual('length_min')
      })
    })
  })
})

