import libmime from 'libmime'
import axios from 'axios'
import Syncano from '@syncano/core'

export default (ctx) => {
  const {data, event, logger} = new Syncano(ctx)
  const {info} = logger('mailgun:message')

  class Message {
    constructor (messagePayload) {
      info(messagePayload)
      this.shortMsg = messagePayload
    }

    async load () {
      await this.getFullMessage()
    }

    async update (params) {
      info('update')
      await data.email_messages.update(this.id, params)
    }

    async save () {
      info('save')
      return data.email_messages.create({
        message: this.body,
        plain_message: this.emailBody,
        status: 'unprocessed'
      })
      .then((msg) => {
        this.id = msg.id
        info('message saved')
        event.emit('message-received', this.id)
      })
    }

    async getFullMessage () {
      info('getFullMessage')
      // let's make a request to the API
      const res = await axios.get(this.shortMsg['message-url'], {
        auth: {
          username: 'api',
          password: ctx.config.API_KEY
        },
        headers: {
          'Accept': 'message/rfc2822'
        }
      })

      this.body = res.data
      this.emailBody = libmime.decodeWord(this.shortMsg['body-plain'])
    }
  }
  return Message
}
