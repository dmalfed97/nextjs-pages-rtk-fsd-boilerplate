import { TextField, type TextFieldProps, type TextFieldVariants } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type ReactNode } from 'react'
import type { UseWatchProps, FieldPath, FieldValues, ControllerFieldState } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { useStyles } from './index.styled'

interface RHFTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
  trimWhiteSpaces?: boolean
  variant?: TextFieldVariants
}

/**
 * TextField for react-hook-form
 * @param name - for r-h-f control prop
 * @param hookFormProps
 * @param trimWhiteSpaces - flag for clearing the field from spaces during onChange
 * @param variant
 * @param rest - inherit from SelectProps
 */
const RHFTextField = function <T extends FieldValues>({
  name,
  hookFormProps,
  trimWhiteSpaces,
  variant = 'outlined',
  ...rest
}: RHFTextFieldProps<T>) {
  const { t } = useTranslation('common')

  const { classes } = useStyles()

  // Handlers
  const getHelperText = (fieldState: ControllerFieldState): ReactNode => {
    if (fieldState.error?.type === 'server') {
      return fieldState.error?.message
    }
    if (fieldState.error?.message) {
      return t(fieldState.error?.message, { defaultValue: t('errors.fieldError') })
    }
    return rest.helperText
  }

  // Renders
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          className={classes.textField}
          inputRef={field.ref}
          variant={variant}
          {...field}
          {...rest}
          error={!!fieldState.error?.message || rest.error}
          helperText={getHelperText(fieldState)}
          ref={null}
          onChange={(e) => {
            const { onChange } = rest

            if (onChange) {
              onChange(e)
            } else {
              if (trimWhiteSpaces) {
                field.onChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: e.target.value.trim(),
                  },
                })
              } else {
                field.onChange(e)
              }
            }
          }}
        />
      )}
      {...hookFormProps}
    />
  )
}

export { RHFTextField }
