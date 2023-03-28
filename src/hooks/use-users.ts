import { User } from '@/models'
import useSWR from 'swr'
import { PublicConfiguration, SWRConfiguration } from 'swr/_internal'

export function useUsers(option?: Partial<PublicConfiguration>, page = 1, limit = 10) {
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

  return {
    users,
    error,
    isLoading,
    mutate,
  }
}
