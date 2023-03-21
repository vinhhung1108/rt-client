import { LoginForm } from '@/components/auth'
import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()

  const { profile, error, login, logout, isLoading, mutate } = useAuth({
    revalidateOnMount: true,
    revalidateOnFocus: true,
    dedupingInterval: TimeByMilliseconds.HOUR,
  })

  async function handleLoginSubmit(payload: LoginPayload) {
    try {
      await login(payload)
      await router.push('/')
    } catch (error) {
      console.log('Failed to login ', error)
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
