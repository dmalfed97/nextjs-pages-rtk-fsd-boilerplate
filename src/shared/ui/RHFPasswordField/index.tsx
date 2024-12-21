import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material'
import { InputAdornment, IconButton, type OutlinedTextFieldProps } from '@mui/material'
import React, { useState } from 'react'
import type { FieldPath, FieldValues, UseWatchProps } from 'react-hook-form'

import { RHFTextField } from '../RHFTextField'

interface RHFPasswordFieldProps<T extends FieldValues>
  extends Omit<OutlinedTextFieldProps, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
}

const RHFPasswordField = function <T extends FieldValues>(props: RHFPasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // Handlers
  const handleToggleShowPassword = (): void => {
    setShowPassword((prev) => !prev)
  }

  // Renders
  return (
    <RHFTextField
      type={showPassword ? 'text' : 'password'}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleToggleShowPassword}>
              {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export { RHFPasswordField }
