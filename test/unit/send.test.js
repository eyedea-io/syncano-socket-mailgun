/* global describe it expect */
import {run} from '@syncano/test'
import * as mockMailgun from 'mailgun-js'

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

  it('error while sending e-mail', async () => {

    const errorMsg = 'Error!'
    mockMailgun.default = jest.fn()
    mockMailgun.default.mockImplementation(() => {
      return {
        messages: () => {
          return {
            send: () => {
              throw new Error(errorMsg)
            }
          }
        }
      }
    })

    const result = await run('send', {args: testEmail, config})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', errorMsg)
  })
})
