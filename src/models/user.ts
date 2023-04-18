export interface User {
  username: string
  email: string
  roles: string[]
  userId: string
  _id: string
}

export interface UserTable {
  username: string
  email: string
  roles: string[]
  userId: string
  _id: string
  actions?: string
}
