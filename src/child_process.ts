import type { LiveServerParams as serveOptions } from '@kid-joker/live-server'
import { start } from './server'
import type { Message } from './types'

const startServer = async function (options: serveOptions) {
  const serverURL = await start(options)

  if (process.send) {
    process.send({
      type: 'mount',
      data: serverURL,
    })
  }
}

process.on('message', (message: Message) => {
  switch (message.type) {
    case 'create':
      startServer(message.data as serveOptions)
      break
  }
})

if (process.send)
  process.send({ type: 'open' })
