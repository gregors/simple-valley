import newValidator from '@/validator'
import validateInclusion from '@/validateInclusion'

describe('validateInclusion', () => {
  describe('with valid data', () => {

    it('sets isValid to true', () => {
      let validator = newValidator({title: 'DEV' })

      validator = validateInclusion(validator, 'title', { choices: ['DEV']})

      expect(validator.isValid).toBe(true)
    })

    it('doesnt add message', () => {
      let validator = newValidator({title: 'DEV' })
      expect(validator.messages.length).toBe(0)

      validator = validateInclusion(validator, 'title', { choices: ['DEV']})

      expect(validator.messages.length).toBe(0)
    })
  })

  describe('with choicesvalid data', () => {

    it('sets isValid to false', () => {
      let validator = newValidator({title: 'PM' })

      validator = validateInclusion(validator, 'title', { choices: ['DEV']})

      expect(validator.isValid).toBe(false)
    })

    it('adds message', () => {
      let validator = newValidator({title: 'PM' })
      expect(validator.messages.length).toBe(0)

      validator = validateInclusion(validator, 'title', { choices: ['DEV']})

      expect(validator.messages.length).toBe(1)
      expect(validator.messages[0].message).toEqual('PM is not a choice')
      expect(validator.messages[0].field).toEqual('title')
      expect(validator.messages[0].type).toEqual('inclusion')
    })

  })
})
