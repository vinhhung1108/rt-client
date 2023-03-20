import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { Container, Link as MuiLink, Stack } from '@mui/material'
import { Box } from '@mui/system'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTER_LIST } from './routers'

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter()

  const { profile, logout } = useAuth()

  const isLoggedIn = Boolean(profile?.username)

  const routeList = ROUTER_LIST.filter((route) => !route.requiredLogin || isLoggedIn)

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {routeList.map((route) => (
            <MuiLink
              sx={{
                ml: 2,
                fontWeight: 'medium',
                color: '#000000',
                '&:hover, &.active': {
                  color: 'primary.main',
                },
              }}
              component={Link}
              key={route.path}
              variant="body2"
              href={route.path}
              className={clsx({ active: router.pathname === route.path })}
            >
              {route.label}
            </MuiLink>
          ))}
          {!isLoggedIn && (
            <MuiLink
              sx={{
                ml: 2,
                fontWeight: 'medium',
                color: '#000000',
                '&:hover, &.active': {
                  color: 'primary.main',
                },
              }}
              component={Link}
              variant="body2"
              href="/login"
            >
              Login
            </MuiLink>
          )}
          {isLoggedIn && (
            <MuiLink
              sx={{
                ml: 2,
                fontWeight: 'medium',
                color: '#000000',
                '&:hover, &.active': {
                  color: 'primary.main',
                },
              }}
              component={Link}
              variant="body2"
              onClick={logout}
              href=""
            >
              Logout
            </MuiLink>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
