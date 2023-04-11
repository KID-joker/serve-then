import { prependShutdown, start } from './server'
import type { Message, StartOptions } from './types'

const startServer = async function (options: StartOptions) {
  const { server, serverURL } = await start(options)

  if (process.send) {
    process.send({
      type: 'mount',
      data: serverURL,
    })
  }

  prependShutdown(server, process.ppid)
}

process.on('message', (message: Message) => {
  switch (message.type) {
    case 'create':
      startServer(message.data as StartOptions)
      break
  }
})

if (process.send)
  process.send({ type: 'open' })
