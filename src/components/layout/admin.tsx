import { LayoutProps } from '@/models'
import { Box, Stack } from '@mui/material'
import { SideBarAdmin } from '../admin'
import { Footer } from '../common'
import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'

export function AdminLayout({ children }: LayoutProps) {
  const { profile, logout } = useAuth()
  const router = useRouter()
  if (!profile?.username) {
    console.log('logout adminlaout')
    return router.push('/')
  }

  // const router = useRouter()

  return (
    <Stack minHeight="100vh">
      <Box component="main" flexGrow={1}>
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <SideBarAdmin />
          <Box sx={{ p: '20px' }}>{children}</Box>
        </Stack>
      </Box>
      <Footer />
    </Stack>
  )
}
