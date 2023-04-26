export interface User {
  username: string
  email: string
  roles: string[]
  userId: string
  _id: string
  isCreateAble: boolean
  isActive: boolean
}

export interface UserTable {
  username: string
  email: string
  roles: string[]
  userId: string
  _id: string
  actions?: string
  isCreateAble: boolean
  isActive: boolean
}
