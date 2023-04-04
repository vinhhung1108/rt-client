import { useUsers } from '@/hooks'
import { UserPayload } from '@/models'
import { getErrorMessage } from '@/utils/error-with-message'
import { Box, Paper, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import { UserForm } from './user-form'

interface UserModalProps {
  modalTitle?: ReactElement | string
  isUpdate?: boolean
  handleUserSubmit: (payload: UserPayload) => void
}
export default function UserModal({
  modalTitle = undefined,
  isUpdate = false,
  handleUserSubmit,
}: UserModalProps) {
  return (
    <Box>
      <Paper elevation={4} sx={{ p: 4, maxWidth: '480px', mx: 'auto', textAlign: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
          {modalTitle ?? (isUpdate ? 'Update User' : 'Create User')}
        </Typography>
        <UserForm onSubmit={handleUserSubmit} />
      </Paper>
    </Box>
  )
}
