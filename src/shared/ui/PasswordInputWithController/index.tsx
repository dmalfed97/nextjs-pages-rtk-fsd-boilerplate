import React, { useState } from 'react'
import type { FieldPath, FieldValues, UseWatchProps } from 'react-hook-form'
import type { OutlinedTextFieldProps } from '@mui/material'
import { InputAdornment, IconButton } from '@mui/material'
import {
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material'

import { TextFieldWithController } from '../TextFieldWithController'

interface PasswordInputWithControllerProps<T extends FieldValues>
  extends Omit<OutlinedTextFieldProps, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
}

const PasswordInputWithController = function <T extends FieldValues>(
  props: PasswordInputWithControllerProps<T>
) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // Handlers
  const handleToggleShowPassword = (): void => {
    setShowPassword((prev) => !prev)
  }

  // Renders
  return (
    <TextFieldWithController
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

export { PasswordInputWithController }
