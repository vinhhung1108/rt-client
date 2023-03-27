import { LoginForm } from '@/components/auth'
import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import { getErrorMessage } from '@/utils/error-with-message'
import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const router = useRouter()

  const { profile, error, login, logout, isLoading, mutate } = useAuth({
    revalidateOnMount: true,
    revalidateOnFocus: true,
    dedupingInterval: TimeByMilliseconds.HOUR,
  })

  if (!isLoading && profile?.username) {
    router.push('/')
  }

  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload)
      await router.push('/')
    } catch (error: unknown) {
      // console.log((error as Error)?.message || '')
      // toast.error((error as Error)?.message || '')
      const message = getErrorMessage(error)
      // console.log('Message:', message)
      toast.error(message)
    }
  }

  return (
    <Box>
      <Paper elevation={4} sx={{ mt: 8, p: 4, maxWidth: '480px', mx: 'auto', textAlign: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
          LOGIN PAGE
        </Typography>
        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  )
}

LoginPage.isPrivate = false
