import { useLoginFormSchema } from '@/hooks'
import { LoginPayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../form'

export interface UserFormProps {
  onSubmit?: (payload: LoginPayload) => void
  isUpdate?: boolean
}

export function UserForm({ onSubmit, isUpdate = false }: UserFormProps) {
  const schema = useLoginFormSchema()

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayload>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  async function handleUserSubmit(payload: LoginPayload) {
    await onSubmit?.(payload)
  }
  return (
    <Box component="form" onSubmit={handleSubmit(handleUserSubmit)}>
      <InputField name="username" label="Username" control={control} />
      <InputField name="email" label="Email" control={control} />
      <InputField
        type={showPassword ? 'text' : 'password'}
        name="password"
        label="Password"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((x) => !x)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <InputField
        type={showPassword ? 'text' : 'password'}
        name="confirmPassword"
        label="Confirm Password"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((x) => !x)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <InputField name="roles" label="Roles" control={control} />

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
