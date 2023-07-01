export interface LoginPayload {
  username: string
  password: string
}

export interface UserProfile {
  username: string
  roles?: string[]
  userId: string
}
