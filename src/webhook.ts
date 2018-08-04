import * as S from '@eyedea/syncano'
import getMessageClass from './models/message'

// Arguments
interface Args {
  shortMsg: string
  id: string
  body: string
  emailBody: string
}

class Endpoint extends S.Endpoint<Args> {
  info: any
  async run(
    {response, logger}: S.Core,
    ctx: S.Context<Args>
  ) {
    this.initLogger(logger)

    await this.getMessage(ctx)

    return response.success()
  }

  initLogger(logger: any) {
    const {info} = logger('mailgun:webhook')
    this.info = info
  }

  async getMessage(ctx: S.Context) {
    this.info('init message')
    const Message = getMessageClass(ctx)
    const msg = new Message(ctx.args)

    this.info('load message')
    await msg.load()
    await msg.save()
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
