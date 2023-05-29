import { useAuth } from '@/hooks'
import { LayoutProps } from '@/models'
import { Box, Stack } from '@mui/material'
import { SideBarAdmin } from '../admin'
import { Footer } from '../common'

export function UserLayout({ children }: LayoutProps) {
  const { profile, logout } = useAuth()
  // const router = useRouter()

  return (
    <Stack minHeight="100vh">
      <Box component="main" flexGrow={1}>
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <SideBarAdmin />
          <Box sx={{ p: '20px' }}>
            {JSON.stringify(profile)}

            {children}
          </Box>
        </Stack>
      </Box>
      <Footer />
    </Stack>
  )
}
