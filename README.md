# Syncano Socket for Mailgun

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-mailgun/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-mailgun/tree/master)
![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-mailgun/master.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/mailgun.svg)](https://www.npmjs.com/package/@eyedea-sockets/)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-mailgun.svg)

Main Socket features:

* **mailgun/send** — send e-mail
* **mailgun/webhook** — webhook for receiving e-mails via Mailgun

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/mailgun --save
npx s deploy
```

Use it:

```js
import Syncano from @syncano/client

const s = new Syncano(<instaneName>)

// E-mail params
const params = {
  to: 'john.doe@example.com'
  from: 'App admin <example@app.com>'
  subject: 'My awesome subject'
  html: '<h1>Email title</h1><p>Hello</p>'
}
const sendStatus = await s.post('mailgun/send', params)

```

## Endpoints

### mailgun/send

#### Input:

| Parameter | Type   | Description          | Example                            |
|-----------|--------|----------------------|------------------------------------|
| to        | string | Message recipient    | `john.doe@example.com`             |
| from      | string | Message sender       | `App admin <example@app.com>`      |
| subject   | string | Message subject      | `My awesome subject`               |
| html      | string | Message body in HTML | `<h1>Email title</h1><p>Hello</p>` |

#### Outputs:

**success** - **Operation Successful**

- Code: 200
- Mimetype: application/json

| Parameter | Type   | Description        | Example              |
|-----------|--------|--------------------|----------------------|
| message   | string | Success message    | `Message sent.`      |


**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example              |
|-----------|--------|------------------------|----------------------|
| message   | string | Invitation failed      | `Internal error.`    |

### mailgun/webhook

#### Input:

Mailgun E-mail message payload. For more info check section "Parsed Messages Parameters" of Mailgun docs:
https://documentation.mailgun.com/en/latest/user_manual.html#receiving-forwarding-and-storing-messages

#### Outputs:

**success** - **Operation Successful**

- Code: 204
- Mimetype: application/json

**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example           |
|-----------|--------|------------------------|-------------------|
| message   | string | Operation failed       | `Internal error.` |
