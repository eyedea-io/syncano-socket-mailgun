import fetch from 'node-fetch'
import FormData from 'form-data'
import Syncano from '@syncano/core'

export default (ctx) => {
  const {logger, response} = new Syncano(ctx)
  const {info, error} = logger('mailgun:send')

  const url = `https://api:${ctx.config.API_KEY}@api.mailgun.net/v3/${ctx.config.DOMAIN}/messages`
  const data = new FormData()
  const params = ['from', 'to', 'subject', 'html']

  for (const key of params) {
    const value = ctx.args[key]

    if (value) {
      data.append(key, value)
    }
  }

  function parseJSON (response) {
    return response.json()
  }

  function checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  return fetch(url, {method: 'POST', body: data})
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      info('Message was sent.')
      response.json({message: 'Message was sent.'})
    })
    .catch(err => {
      error(err.message)
      response.json({message: err.message})
    })
}
