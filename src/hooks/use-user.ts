import { userApi } from '@/api-client'
import { TimeByMilliseconds } from '@/constants'
import { User, UserPayload, UserUpdatePayload } from '@/models'
import useSWR from 'swr'
import { PublicConfiguration, SWRConfiguration } from 'swr/_internal'

export function useUser(option?: Partial<PublicConfiguration>, id: string = '') {
  const configSWR: SWRConfiguration = {
    dedupingInterval: TimeByMilliseconds.SECOND * 2,
    ...option,
    onSuccess(data) {
      //something on success
    },
    onError(err) {
      //failed to get list users
    },
  }

  const { data: user, error, mutate, isLoading } = useSWR<User | null>(`/user/${id}`, configSWR)

  async function updateUser(id: string, payload: UserUpdatePayload) {
    await userApi.update(payload)
  }
  async function deleteUser(id: string) {
    await userApi.delete(id)
  }

  // async function userDetail(id: string): Promise<User | undefined> {
  //   return await userApi.profile(id)
  // }

  return {
    user,
    // userDetail,
    updateUser,
    deleteUser,
    error,
    isLoading,
    mutate,
  }
}
