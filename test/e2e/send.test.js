/* global describe it expect */
import {run} from '@syncano/test'

describe('send', function () {
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

  it('simple e-mail', async () => {
    const result = await run('send', {args: testEmail, config})
    expect(result).toHaveProperty('code', 200)
    expect(result.data).toHaveProperty('message', 'Message was sent.')
  })
})
