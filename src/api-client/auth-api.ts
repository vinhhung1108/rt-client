import { LoginPayload } from '@/models'
import axiosClient from './axios-client'
import { userApi } from './user-api'
import { useAuth, useUser } from '@/hooks'

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/auth/login', payload)
  },
  logout(id: string | undefined) {
    axiosClient.patch(`/user/${id}`, { isLoggedIn: false })
    return axiosClient.post('/auth/logout')
  },
  getProfile() {
    return axiosClient.get('/auth/profile')
  },
}
