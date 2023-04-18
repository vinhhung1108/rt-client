import { UserUpdatePayload } from '@/models'
import { Box, Paper, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { UserUpdateForm } from './user-update-form'

interface UpdateUserModalContentProps {
  modalTitle?: ReactElement | string
  isUpdate?: boolean
  handleUserSubmit: (id: string, payload: UserUpdatePayload) => void
  dataUserUpdate: UserUpdatePayload | null
}
export default function UpdateUserModalContent({
  modalTitle = undefined,
  isUpdate = true,
  handleUserSubmit,
  dataUserUpdate,
}: UpdateUserModalContentProps) {
  return (
    <Box>
      <Paper elevation={4} sx={{ p: 4, maxWidth: '480px', mx: 'auto', textAlign: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
          {modalTitle ?? (isUpdate ? 'Update ' : 'Create User')}
          {dataUserUpdate && dataUserUpdate.username}
        </Typography>
        {dataUserUpdate && (
          <UserUpdateForm dataUserUpdate={dataUserUpdate} onSubmit={handleUserSubmit} />
        )}
      </Paper>
    </Box>
  )
}
