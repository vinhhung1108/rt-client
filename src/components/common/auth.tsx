import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { render } from 'react-dom'
import { useSWRConfig } from 'swr'

export interface AuthProps {
  children: ReactNode
  isPrivate?: boolean
  requiredRoles?: string[]
}
export function Auth({ children, isPrivate = true, requiredRoles = undefined }: AuthProps) {
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
    if (router.asPath !== '/login' && isPrivate && !isLoading && !profile?.username)
      router.push('/login')
  }, [profile, isLoading, router, isPrivate])

  const userRoles = profile?.roles

  console.log('Roles: ', userRoles)
  console.log('Profile: ', profile)
  console.log('isLoading: ', isLoading)
  console.log('isPrivate:', isPrivate)
  console.log('router: ', router)
  const acceptRole = userRoles?.some((role) => requiredRoles?.includes(role))
  if (requiredRoles && !acceptRole) {
    return <div>You do not have permisstion to access this page!</div>
  }

  if (isLoading)
    return (
      <Box>
        <Container sx={{ maxWidth: 'md' }}>
          <Stack sx={{ mx: 'auto' }}>
            <Typography variant="h3">Loading...</Typography>
          </Stack>
        </Container>
      </Box>
    )

  return <div>{children}</div>
}
