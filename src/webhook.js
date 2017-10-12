import Server from 'syncano-server'
import getMessageClass from './models/message'

export default async (ctx) => {
  const {logger, response} = Server(ctx)
  const {info, error} = logger('email')
  const Message = getMessageClass(ctx)

  async function getMessage () {
    info('init message')
    const msg = new Message(ctx.args)

    info('load message')
    await msg.load()
    await msg.save()

    return response.success()
  }

  return getMessage()
    .catch((err) => {
      error(err)
      return response.fail(err.message)
    })
}
