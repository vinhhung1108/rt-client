export interface LoginPayload {
  username: string
  password: string
}

export interface UserProfile {
  data: {
    username: string
    // email?: string
  }
}
