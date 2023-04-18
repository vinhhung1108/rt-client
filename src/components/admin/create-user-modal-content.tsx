import { UserPayload } from '@/models'
import { Box, Paper, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { UserForm } from './user-form'

interface CreateUserModalContentProps {
  modalTitle?: ReactElement | string
  isUpdate?: boolean
  handleUserSubmit: (payload: UserPayload) => void
}
export default function CreateUserModalContent({
  modalTitle = undefined,
  isUpdate = false,
  handleUserSubmit,
}: CreateUserModalContentProps) {
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
