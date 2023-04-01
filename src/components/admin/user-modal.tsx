import { UserPayload } from '@/models'
import { getErrorMessage } from '@/utils/error-with-message'
import { Box, Paper, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { toast } from 'react-toastify'
import { UserForm } from './user-form'

interface UserModalProps {
  modalTitle?: ReactElement | string
  isUpdate?: boolean
}
export default function UserModal({ modalTitle = undefined, isUpdate = false }: UserModalProps) {
  async function handleUserSubmit(payload: UserPayload) {
    try {
      console.log(payload)
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
      <Paper elevation={4} sx={{ p: 4, maxWidth: '480px', mx: 'auto', textAlign: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
          {modalTitle ?? (isUpdate ? 'Update User' : 'Create User')}
        </Typography>
        <UserForm onSubmit={handleUserSubmit} />
      </Paper>
    </Box>
  )
}
