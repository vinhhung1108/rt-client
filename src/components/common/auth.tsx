import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { render } from 'react-dom'
import { useSWRConfig } from 'swr'

export interface AuthProps {
  children: ReactNode
  isPrivate?: boolean
  requiredRoles?: string[]
}
export function Auth({ children, isPrivate = true, requiredRoles = [] }: AuthProps) {
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

  const userRoles = profile?.roles
  const acceptRole = userRoles?.some((role) => requiredRoles?.includes(role))
  if (!acceptRole) {
    return <div>You do not have enough access rights!</div>
  }

  if (isLoading) return <p>Loading...</p>

  return <div>{children}</div>
}
