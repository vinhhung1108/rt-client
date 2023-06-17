import { userApi } from '@/api-client'
import { ChangePasswordPayload, User, UserPayload, UserUpdatePayload } from '@/models'
import useSWR from 'swr'
import { PublicConfiguration, SWRConfiguration } from 'swr/_internal'

export function useUsers(option?: Partial<PublicConfiguration>, page = 1, limit = 0) {
  const configSWR: SWRConfiguration = {
    ...option,
    onSuccess(data) {
      //something on success
    },
    onError(err) {
      //failed to get list users
    },
  }

  const {
    data: users,
    error,
    mutate,
    isLoading,
  } = useSWR<User[] | null>(`/user?_page=${page}&_limit=${limit}`, configSWR)

  async function createUser(payload: UserPayload) {
    const payloadFull = { ...payload, isActive: false, isCreateAble: true }
    await userApi.create(payloadFull)
  }

  async function updateUser(payload: UserUpdatePayload) {
    await userApi.update(payload)
  }
  async function changePassword(payload: ChangePasswordPayload) {
    await userApi.changePassword(payload)
  }
  async function deleteUser(id: string) {
    await userApi.delete(id)
  }

  return {
    users,
    createUser,
    updateUser,
    changePassword,
    deleteUser,
    error,
    isLoading,
    mutate,
  }
}
