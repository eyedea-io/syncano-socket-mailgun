import * as S from '@eyedea/syncano'
import Syncano from '@syncano/core'
import axios from 'axios'
import libmime from 'libmime'

export default (ctx: S.Context) => {
  const {data, event, logger} = new Syncano(ctx)
  const {info} = logger('mailgun:message')

  const API_KEY = ctx.config.API_KEY

  class Message {
    messagePayload: string
    id: string
    body: string
    emailBody: string

    constructor (messagePayload: any) {
      info(messagePayload)
      this.messagePayload = messagePayload
    }

    async load () {
      // await this.getFullMessage()
    }

    async update (params: any) {
      info('update')
      await data.email_messages.update(this.id, params)
    }

    async save () {
      info('save')
      const msg = await data.email_messages.create({
        messageUrl: this.messagePayload['message-url'],
        status: 'unprocessed',
      })

      this.id = msg.id
      info('message saved')
      event.emit('message-received', this.id)
    }

    // async getFullMessage () {
    //   info('getFullMessage')
    //   // let's make a request to the API
    //   const res = await axios.get(this.messagePayload['message-url'], {
    //     auth: {
    //       username: 'api',
    //       password: API_KEY,
    //     },
    //     headers: {
    //       'Accept': 'message/rfc2822',
    //     },
    //   })
    //
    //   this.body = res.data
    //   // this.emailBody = libmime.decodeWords(this.messagePayload['body-plain'], 'utf-8')
    //   this.emailBody = this.messagePayload['body-plain']
    // }
  }

  return Message
}
