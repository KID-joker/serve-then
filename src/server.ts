import type { Server } from 'http'
import path from 'path'
import liveServer from '@kid-joker/live-server'
import type { StartOptions } from './types'
import { checkProcess } from './util'

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
  return {
    server,
    serverURL: `http://${addressInfo.address === '0.0.0.0' ? '127.0.0.1' : addressInfo.address}:${addressInfo.port}`,
  }
}

export const prependShutdown = function (server: Server, listenPid: number) {
  const timer = setInterval(() => {
    if (!checkProcess(listenPid)) {
      clearInterval(timer)
      server.close()
      process.exit()
    }
  }, 1000)
}
