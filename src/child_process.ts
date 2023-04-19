import type { LiveServerParams as serveOptions } from '@kid-joker/live-server'
import liveServer from '@kid-joker/live-server'
import type { Message } from './types'

const startServer = async function (options: serveOptions) {
  const server = await liveServer.start(options)

  const addressInfo = server.address()
  const serverURL = `http://${addressInfo.address === '0.0.0.0' ? '127.0.0.1' : addressInfo.address}:${addressInfo.port}`

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
