import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useSWRConfig } from 'swr'

export interface AuthProps {
  children: ReactNode
  isPrivate?: boolean
}
export function Auth({ children, isPrivate = true }: AuthProps) {
  const router = useRouter()
  const { mutate: mutateAll } = useSWRConfig()
  const { profile, logout, isLoading, error, mutate } = useAuth({
    revalidateOnFocus: true,
    revalidateOnMount: true,
    dedupingInterval: TimeByMilliseconds.HOUR,
  })

  if (!isLoading && error && isPrivate) {
    logout()
  }

  useEffect(() => {
    if (isPrivate && !isLoading && !profile?.username) router.push('/login')
  }, [profile, isLoading, router, isPrivate])

  if (isLoading) return <p>Loading...</p>

  return <div>{children}</div>
}
