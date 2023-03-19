import { TextField, TextFieldProps } from '@mui/material'
import { Control, useController } from 'react-hook-form'

export type InputFieldProps = TextFieldProps & {
  name: string
  control: Control<any>
}

export function InputField({
  name,
  control,
  onChange: externalOnChange, //prevent from form props, using onChange of useController instead
  onBlur: externalOnBlur, //Similar above
  ref: externalRef, //Similar above
  value: externalValue, //SImilar above
  ...rest
}: InputFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })

  //render whatever you want
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  )
}
