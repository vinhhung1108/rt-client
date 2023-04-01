import { Box, FormControl } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectProps } from '@mui/material/Select'
import React from 'react'
import { Control, useController } from 'react-hook-form'

export type MultiSelectFieldProps = SelectProps & {
  name: string
  control: Control<any>
  names?: string[]
}
export function MultiSelectField({
  name,
  control,
  onChange: externalOnChange, //prevent from form props, using onChange of useController instead
  onBlur: externalOnBlur, //Similar above
  ref: externalRef, //Similar above
  value: externalValue,
  labelId,
  defaultValue,
  names = [],
  label,
  ...rest
}: MultiSelectFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control })

  return (
    <Box sx={{ textAlign: 'left', my: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
        <Select
          name={name}
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          fullWidth
          {...rest}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={value.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
