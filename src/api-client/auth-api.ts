import { LoginPayload } from '@/models'
import { AxiosResponse } from 'axios'
import axiosClient from './axios-client'

export const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/auth/login', payload)
  },
  logout() {
    return axiosClient.post('/auth/logout')
  },
  getProfile() {
    return axiosClient.get('/auth/profile')
  },
}
