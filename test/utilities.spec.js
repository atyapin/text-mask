import chai from 'chai'
import {
  getDelimiters,
  constructConformedString
} from '../src/utilities.js'

const expect = chai.expect

describe('utilities', () => {
  describe('getDelimiters', () => {
    it('returns an array', () => {
      expect(getDelimiters()).to.be.an('array')
    })

    it('returns [`/`] for pattern `11/11/1111`', () => {
      expect(getDelimiters('11/11/1111')).to.eql(['/'])
    })
  })
})