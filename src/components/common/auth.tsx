import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { Box, Container, LinearProgress, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
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

  // console.log('Profile: ', JSON.stringify(profile))
  // console.log('isLoading: ', isLoading)
  // console.log('Router: ', router.asPath)

  if (!isLoading && !profile?.username && isPrivate) {
    // console.log('Call to logout')
    logout()
  }

  const userRoles = profile?.roles
  const acceptRole = userRoles?.some((role) => requiredRoles?.includes(role))

  const notValidatePrivate =
    router.asPath !== '/login' && isPrivate && !isLoading && !profile?.username
  const notValidateRole = requiredRoles && !acceptRole

  useEffect(() => {
    // console.log('call useEffect with isLoading: ', isLoading)
    if (router.asPath !== '/login' && !isLoading && isPrivate && !profile?.username) {
      // console.log('Redirect to login after loading')
      router.push('/login')
    } else if (requiredRoles && !isLoading && !acceptRole) {
      // console.log('RequiredRoles: ', requiredRoles)
      router.push('/')
    }
  }, [router, isLoading, profile, isPrivate, requiredRoles, acceptRole])

  if (
    isLoading ||
    (!isLoading && !profile?.username && isPrivate) ||
    (!isLoading && requiredRoles && !acceptRole)
  ) {
    // console.log('Show Is loading')
    return (
      <Box>
        <Container sx={{ maxWidth: 'md' }}>
          <Stack
            sx={{
              mx: 'auto',
              minHeight: '100vh',
              width: '100%',
            }}
          >
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Loading ...
            </Typography>
            <LinearProgress />
          </Stack>
        </Container>
      </Box>
    )
  }
  // console.log('show Children component')
  return <div>{children}</div>
}
