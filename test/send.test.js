/* global describe it */
import {assert} from 'chai'
import {run, generateMeta} from 'syncano-test'

describe('send', function () {
  const meta = generateMeta()

  const config = {
    API_KEY: process.env.MAILGUN_TEST_API_KEY,
    DOMAIN: process.env.MAILGUN_TEST_DOMAIN
  }

  const testEmail = {
    to: process.env.MAILGUN_TEST_RECIPIENT,
    from: 'test.socket@test.com',
    subject: 'Test E-mail',
    html: '<h1>Email title</h1><p>Hello World!</p>'
  }

  it('simple e-mail', function (done) {
    run('send', {args: testEmail, meta, config})
      .then(res => {
        assert.propertyVal(res, 'code', 200)
        assert.propertyVal(res.data, 'message', 'Message was sent.')
        done()
      })
  })
})
