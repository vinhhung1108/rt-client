import { useAuth } from '@/hooks'
import { LayoutProps } from '@/models'
import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { Auth, Footer, Header } from '../common'

export function AdminLayout({ children }: LayoutProps) {
  // const { profile, logout } = useAuth()
  // const router = useRouter()

  return (
    <Auth>
      <Stack minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1}>
          {children}
        </Box>
        <Footer />
      </Stack>
    </Auth>
  )
}
