export interface UserPayload {
  username: string
  email: string
  password: string
  confirmPassword: string
  roles: string[]
  isActive: boolean
  isCreateAble: boolean
  isLoggedIn: boolean
}

export interface UserUpdatePayload {
  email: string
  roles: string[]
  readonly _id: string
  readonly username: string
  isActive: boolean
  isCreateAble: boolean
  isLoggedIn: boolean
}
