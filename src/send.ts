import * as S from '@eyedea/syncano'
import Mailgun from 'mailgun-js'

// Arguments
interface Args {
  from: string
  to: string
  subject: string
  html: string
}

class Endpoint extends S.Endpoint<Args> {
  async run(
    {response}: S.Core,
    {args, config}: S.Context<Args>
  ) {
    const mailgun = Mailgun({apiKey: config.API_KEY, domain: config.DOMAIN})

    const data = {
      from: args.from,
      to: args.to,
      subject: args.subject,
      html: args.html,
    }

    await mailgun.messages().send(data)
    // info('Message was sent.')
    response.json({message: 'Message was sent.'})
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
