import newValidator from '@/validator'

describe('newValidator', () => {
  describe('with empty data', () => {
    it('sets an object as the default', () => {
      const model = undefined
      const validator = newValidator(model)

      expect(validator.isValid).toBe(true)
      expect(validator.data).toStrictEqual({})
    })
  })
})
