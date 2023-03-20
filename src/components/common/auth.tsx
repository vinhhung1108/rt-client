import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useSWRConfig } from 'swr'

export interface AuthProps {
  children: ReactNode
}
export function Auth({ children }: AuthProps) {
  const router = useRouter()
  const { mutate: mutateAll } = useSWRConfig()
  const { profile, logout, isLoading, error, mutate } = useAuth({
    revalidateOnFocus: true,
    revalidateOnMount: true,
    dedupingInterval: TimeByMilliseconds.HOUR,
  })

  if (error && !isLoading) {
    // mutate({ data: {} }, true)
    // mutateAll('/auth/profile/', { data: {} }, false)
    // router.push('/login')
    logout()
  }

  useEffect(() => {
    if (!isLoading && !profile?.username) router.push('/login')
  }, [profile, isLoading, router])

  //   console.log(profile)

  if (isLoading) return <p>Loading...</p>

  return <div>{children}</div>
}
