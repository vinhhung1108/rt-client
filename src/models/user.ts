export interface User {
  username: string
  email: string
  roles: string[]
  userId: string
  _id: string
  isCreateAble: boolean
  isActive: boolean
  isLoggedIn: boolean
  IPAddressLogin: string
  lastLogin: string
  clientApp: string
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
  isLoggedIn: boolean
  IPAddressLogin: string
  lastLogin: string
  clientApp: string
}

export interface ChangePasswordPayload {
  readonly _id: string
  readonly username: string
  password: string
  confirmPassword: string
}
