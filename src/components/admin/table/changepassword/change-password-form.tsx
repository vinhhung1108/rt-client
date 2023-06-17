import { InputField } from '@/components/form'
import { useChangePasswordFormSchema } from '@/hooks'
import { ChangePasswordPayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export interface ChangePasswordFormProps {
  onSubmit?: (payload: ChangePasswordPayload) => void
  isUpdate?: boolean
  dataChangePassword: ChangePasswordPayload
}

export function ChangePasswordForm({ onSubmit, dataChangePassword }: ChangePasswordFormProps) {
  const schema = useChangePasswordFormSchema()

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangePasswordPayload>({
    defaultValues: {
      ...dataChangePassword,
    },
    resolver: yupResolver(schema),
  })

  async function handleUserSubmit(payload: ChangePasswordPayload) {
    await onSubmit?.(payload)
  }
  return (
    <Box component="form" onSubmit={handleSubmit(handleUserSubmit)}>
      <InputField name="username" label="Username" control={control} disabled />
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
      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : ''}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
      >
        CHANGE PASSWORD
      </Button>
    </Box>
  )
}
