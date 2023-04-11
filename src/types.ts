type Data = string | object | number | boolean | undefined

export interface StartOptions {
  port?: number | undefined
  root?: string | undefined
}

export interface Message {
  type: string
  data?: Data
}
