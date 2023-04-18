export interface UserPayload {
  username: string
  email: string
  password: string
  confirmPassword: string
  roles: string[]
}

export interface UserUpdatePayload {
  email: string
  // password: string
  // confirmPassword: string
  roles: string[]
  readonly _id: string
  readonly username: string
}
