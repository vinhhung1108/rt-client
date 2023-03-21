import { authApi } from '@/api-client'
import { StorageKeys, TimeByMilliseconds } from '@/constants'
import { LoginPayload, UserProfile } from '@/models'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { PublicConfiguration, SWRConfiguration } from 'swr/_internal'

function getUserInfo(): UserProfile | null {
  try {
    return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '')
  } catch (error) {
    console.log('Can not get user_info from localStorage', error)
    return { data: { username: '' } }
  }
}

export function useAuth(option?: Partial<PublicConfiguration>) {
  const router = useRouter()
  const { mutate: mutateAll } = useSWRConfig()

  const configSWR: SWRConfiguration = {
    dedupingInterval: TimeByMilliseconds.HOUR,
    ...option,
    fallbackData: getUserInfo,
    onSuccess(data) {
      //save user info to localstorage
      localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data))
    },
    onError(err) {
      //failed to get profile
      // console.log('Cannot get Profile ', err)
      logout()
    },
  }

  const {
    data: profile,
    error,
    mutate,
    isLoading,
  } = useSWR<UserProfile | null>('/auth/profile', configSWR)

  async function login(payload: LoginPayload) {
    await authApi.login(payload)
    await mutate()
  }
  async function logout() {
    await authApi.logout()
    localStorage.removeItem(StorageKeys.USER_INFO)
    // await mutate({ data: {} }, true)
    await mutateAll('/auth/profile', { data: {} }, false)
  }
  return {
    profile: profile?.data,
    error,
    login,
    logout,
    isLoading,
    mutate,
  }
}
