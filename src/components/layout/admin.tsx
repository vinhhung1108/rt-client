import { LayoutProps, NextPageWithLayout } from '@/models'
import { Box, Stack } from '@mui/material'
import { Auth, Footer, Header } from '../common'

export function AdminLayout({ children }: LayoutProps) {
  // const { profile, logout } = useAuth()
  // const router = useRouter()

  return (
    <Auth>
      <Stack minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1}>
          <h2>Admin Layout</h2>
          {children}
        </Box>
        <Footer />
      </Stack>
    </Auth>
  )
}
