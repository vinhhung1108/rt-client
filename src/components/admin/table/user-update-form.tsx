import { InputField, MultiSelectField } from '@/components/form'
import { useUserUpdateFormSchema } from '@/hooks'
import { UserUpdatePayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ROLES_LIST } from '../roles-list'

export interface UserUpdateFormProps {
  onSubmit?: (id: string, payload: UserUpdatePayload) => void
  isUpdate?: boolean
  dataUserUpdate: UserUpdatePayload
}

export function UserUpdateForm({ onSubmit, isUpdate = true, dataUserUpdate }: UserUpdateFormProps) {
  const schema = useUserUpdateFormSchema()
  const roles_list = ROLES_LIST
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserUpdatePayload>({
    defaultValues: {
      ...dataUserUpdate,
    },
    resolver: yupResolver(schema),
  })
  const valueRoles = roles_list.map((role) => role.name)

  async function handleUserSubmit(payload: UserUpdatePayload) {
    await onSubmit?.(dataUserUpdate._id, payload)
  }
  return (
    <Box component="form" onSubmit={handleSubmit(handleUserSubmit)}>
      <InputField name="username" label="Username" control={control} />
      <InputField name="email" label="Email" control={control} />

      <MultiSelectField name="roles" label="Roles" control={control} names={valueRoles} />

      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : ''}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        {isUpdate ? 'UPDATE' : 'CREATE'}
      </Button>
    </Box>
  )
}