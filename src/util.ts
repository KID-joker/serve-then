import path from 'path'
import { fileURLToPath } from 'url'

export const checkProcess = function (pid: number): boolean {
  if (!pid)
    return false

  try {
    // A signal of 0 can be used to test for the existence of a process.
    process.kill(pid, 0)
    return true
  }
  catch (err) {
    return false
  }
}

export const getDirname = function (moduleUrl: string) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}
