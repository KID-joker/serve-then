import path from 'path'
import { fileURLToPath } from 'url'

export const getDirname = function (moduleUrl: string) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}
