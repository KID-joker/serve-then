import type { LiveServerParams as serveOptions } from '@kid-joker/live-server'
import liveServer from '@kid-joker/live-server'

export const start = async function (serverOptions: serveOptions) {
  const server = await liveServer.start(serverOptions)

  const addressInfo = server.address()
  return `http://${addressInfo.address === '0.0.0.0' ? '127.0.0.1' : addressInfo.address}:${addressInfo.port}`
}
