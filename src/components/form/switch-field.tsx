import { FormControlLabel, Switch, SwitchProps, TextField, TextFieldProps } from '@mui/material'
import { Control, useController } from 'react-hook-form'

export type SwitchFieldProps = SwitchProps & {
  name: string
  label: string
  control: Control<any>
  checked: boolean
}

export function SwitchField({
  name,
  label,
  control,
  onChange: externalOnChange, //prevent from form props, using onChange of useController instead
  ref: externalRef, //Similar above
  value: externalValue, //SImilar above
  checked,
  ...rest
}: SwitchFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })

  //render whatever you want
  return (
    <FormControlLabel
      control={
        <Switch
          name={name}
          // value={value}
          onChange={onChange}
          inputRef={ref}
          inputProps={{ 'aria-label': 'controlled' }}
          defaultChecked={checked}
          {...rest}
        />
      }
      label={label}
    />
  )
}
