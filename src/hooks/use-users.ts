import { userApi } from '@/api-client'
import { User, UserPayload } from '@/models'
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
    await userApi.create(payload)
  }

  async function updateUser(id: string, payload: UserPayload) {
    await userApi.update(id, payload)
  }
  async function deleteUser(id: string) {
    await userApi.delete(id)
  }

  return {
    users,
    createUser,
    updateUser,
    deleteUser,
    error,
    isLoading,
    mutate,
  }
}
