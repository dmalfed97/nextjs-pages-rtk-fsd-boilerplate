import { TextField, type TextFieldProps, type TextFieldVariants } from '@mui/material'
import React, { type ChangeEvent, type ReactNode } from 'react'
import type {
  UseWatchProps,
  FieldPath,
  FieldValues,
  ControllerFieldState,
  ControllerRenderProps,
} from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

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
  const renderTextField = ({
    field,
    fieldState,
  }: {
    field: ControllerRenderProps<T, typeof name>
    fieldState: ControllerFieldState
  }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    }

    return (
      <TextField
        className={classes.textField}
        inputRef={field.ref}
        variant={variant}
        {...field}
        {...rest}
        error={!!fieldState.error?.message || rest.error}
        helperText={getHelperText(fieldState)}
        onChange={handleInputChange}
      />
    )
  }

  return <Controller name={name} render={renderTextField} {...hookFormProps} />
}

export { RHFTextField }
