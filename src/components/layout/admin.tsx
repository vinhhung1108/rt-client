import { LayoutProps, NextPageWithLayout } from '@/models'
import { Box, Stack } from '@mui/material'
import { SideBar } from '../admin'
import { Auth, Footer, Header } from '../common'

export function AdminLayout({ children }: LayoutProps) {
  // const { profile, logout } = useAuth()
  // const router = useRouter()

  return (
    <Stack minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1}>
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <SideBar />
          <Box sx={{ p: '20px' }}>{children}</Box>
        </Stack>
      </Box>
      <Footer />
    </Stack>
  )
}
