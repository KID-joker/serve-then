import { fork } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Message, StartOptions } from './types'
import { getDirname } from './util'

export type { StartOptions }

export const serve = function (options?: StartOptions): Promise<string> {
  return new Promise((resolve) => {
    const dirname = getDirname(import.meta.url)
    const serverPath = path.resolve(dirname, '.', `child_process${path.extname(fileURLToPath(import.meta.url))}`)

    const server = fork(serverPath, {
      detached: true,
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })

    server.stderr?.on('data', (data) => {
      console.error(data.toString())
    })

    server.on('message', (message: Message) => {
      switch (message.type) {
        case 'open':
          server.send({
            type: 'create',
            data: options || { },
          })
          break
        case 'mount':
          server.stdio.forEach(stream => stream?.destroy())
          resolve(message.data as string)
          break
      }
    })

    server.unref()

    process.on('exit', () => {
      server.kill()
    })
  })
}
