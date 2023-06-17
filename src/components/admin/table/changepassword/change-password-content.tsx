import { ChangePasswordPayload, UserUpdatePayload } from '@/models'
import { Box, Paper, Typography } from '@mui/material'
import { ChangePasswordForm } from './change-password-form'

interface ChangePasswordContentProps {
  isUpdate?: boolean
  onSubmit: (payload: ChangePasswordPayload) => void
  dataChangePassword: ChangePasswordPayload | null
}
export default function ChangePasswordContent({
  isUpdate = true,
  onSubmit,
  dataChangePassword,
}: ChangePasswordContentProps) {
  return (
    <Box>
      <Paper elevation={4} sx={{ p: 4, maxWidth: '480px', mx: 'auto', textAlign: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
          Change Password {dataChangePassword && dataChangePassword.username}
        </Typography>
        {dataChangePassword && (
          <ChangePasswordForm dataChangePassword={dataChangePassword} onSubmit={onSubmit} />
        )}
      </Paper>
    </Box>
  )
}
