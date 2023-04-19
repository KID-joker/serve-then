type Data = string | object | number | boolean | undefined

export interface Message {
  type: string
  data?: Data
}
