/* global describe it expect */
import {run} from '@syncano/test'
import * as mockMailgun from 'mailgun-js'
import mockAxios from 'axios'
import sampleMessage from './sample-email'

describe('send', function () {
  const testEmail = sampleMessage

  it('simple webhook call', async () => {
    mockAxios.get = jest.fn()
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: 'DATA!'
      })
    )

    require('@syncano/core').__setMocks({
      data: {
        email_messages: {
          create: jest.fn().mockImplementationOnce(() => Promise.resolve({id: 123}))
        }
      }
    })

    const result = await run('webhook', {args: testEmail})
    expect(result).toHaveProperty('code', 204)
  })
})
