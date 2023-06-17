import { User, UserPayload, UserUpdatePayload } from '@/models'
import axiosClient from './axios-client'

export const userApi = {
  create(payload: UserPayload) {
    return axiosClient.post('/user/create', payload)
  },
  update(payload: UserUpdatePayload) {
    const { username, email, isActive, isBanned, isCreateAble, roles, _id } = payload
    const datapayload = { username, email, isActive, isBanned, isCreateAble, roles, _id }
    return axiosClient.patch(`/user/${_id}`, datapayload)
  },
  delete(id: string) {
    return axiosClient.delete(`/user/${id}`)
  },
  listUser(page: number, limit: number) {
    return axiosClient.get(`/user?_page=${page}&_limit=${limit}`)
  },
  profile(id: string): Promise<User | undefined> {
    return axiosClient.get(`/user/${id}`)
  },
}
