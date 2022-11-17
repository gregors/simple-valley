import newValidator from '../src/validator'
import validateUrl from '../src/validateUrl'

describe('validateUrl', () => {
  describe('with subkeys', () => {
    it('validates', () => {
      let validator = newValidator({page: {url: 'https://github.com/gregors' }})
      validator = validateUrl(validator, 'page.url')

      expect(validator.isValid).toBe(true)
    })
  })

  describe('is immutable', () => {
    it('doesnt change previous validator', () => {
      const validator = newValidator({url: 'https/github.com/gregors' })
      const validator2 = validateUrl(validator, 'url')

      expect(validator.isValid).toBe(true)
      expect(validator2.isValid).toBe(false)
    })
  })

  describe('with valid url', () => {

    it('sets isValid to true', () => {
      let validator = newValidator({url: 'https://github.com/gregors' })
      validator = validateUrl(validator, 'url')

      expect(validator.isValid).toBe(true)
    })

    it('with query params sets isValid to true', () => {
      let validator = newValidator({url: 'https://github.com/gregors?boom=true' })
      validator = validateUrl(validator, 'url')

      expect(validator.isValid).toBe(true)
    })

    it('with ip sets isValid to true', () => {
      let validator = newValidator({url: 'https://127.0.0.1' })
      validator = validateUrl(validator, 'url')

      expect(validator.isValid).toBe(true)
    })
  })

  describe('with invalid url', () => {

    it('sets isValid to false', () => {
      let validator = newValidator({url: 'https/github.com/gregors' })
      validator = validateUrl(validator, 'url')

      expect(validator.isValid).toBe(false)
    })

    it('adds message', () => {
      let validator = newValidator({url: 'https/github.com/gregors' })
      validator = validateUrl(validator, 'url')

      expect(validator.messages.length).toBe(1)
      expect(validator.messages[0].message).toEqual('invalid url')
      expect(validator.messages[0].field).toEqual('url')
      expect(validator.messages[0].type).toEqual('invalid_url')
    })

    describe('with custom message', () => {
      it('adds message', () => {
        let validator = newValidator({url: 'https/github.com/gregors' })
        expect(validator.messages.length).toBe(0)
        validator = validateUrl(validator, 'url', { message: 'try again' })

        expect(validator.messages.length).toBe(1)
        expect(validator.messages[0].message).toEqual('try again')
      })
    })
  })
})
