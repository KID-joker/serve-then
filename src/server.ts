import path from 'path'
import liveServer from '@kid-joker/live-server'
import type { StartOptions } from './types'

export const start = async function (serverOptions: StartOptions) {
  const cwd = process.cwd()
  const port = serverOptions.port || 8080
  const root = serverOptions.root ? path.resolve(cwd, serverOptions.root) : cwd

  const params = {
    port,
    root,
    open: false,
    cors: true,
  }
  const server = await liveServer.start(params)

  const addressInfo = server.address()
  return `http://${addressInfo.address === '0.0.0.0' ? '127.0.0.1' : addressInfo.address}:${addressInfo.port}`
}
