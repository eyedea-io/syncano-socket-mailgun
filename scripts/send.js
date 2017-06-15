/* global CONFIG, META */
import fetch from 'node-fetch'
import FormData from 'form-data'
import {response} from 'syncano-server'


const {API_KEY, DOMAIN} = CONFIG

const url = `https://api:${API_KEY}@api.mailgun.net/v3/${DOMAIN}/messages`
const data = new FormData()
const params = ['from', 'to', 'subject', 'html']

for (const key of params) {
  const value = ARGS[key]

  if (value) {
    data.append(key, value)
  }
}

fetch(url, {method: 'POST', body: data})
  .then(checkStatus)
  .then(parseJSON)
  .then(res => {
    response.json({message: "Message was sent."})
  })
  .catch(err => {
    response.json({message: err.message})
  })

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
