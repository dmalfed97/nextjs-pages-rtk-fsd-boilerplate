import type { SelectProps, SelectVariants } from '@mui/material'
import { FormControl, InputLabel, Select, FormHelperText } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type ReactNode } from 'react'
import type { UseWatchProps, FieldPath, FieldValues, ControllerFieldState } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { useStyles } from './index.styled'

interface RHFSelectFieldProps<T extends FieldValues> extends Omit<SelectProps, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
  variant?: SelectVariants
  helperText?: ReactNode
}

/**
 * Select for react-hook-form
 * @param name - for r-h-f control prop
 * @param hookFormProps
 * @param variant
 * @param helperText
 * @param rest - inherit from SelectProps
 */
const RHFSelectField = function <T extends FieldValues>({
  name,
  hookFormProps,
  variant = 'outlined',
  helperText,
  ...rest
}: RHFSelectFieldProps<T>) {
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
    return helperText
  }

  // Renders
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <FormControl>
          {rest.label && <InputLabel id="demo-simple-select-helper-label">{rest.label}</InputLabel>}

          <Select
            className={classes.select}
            inputRef={field.ref}
            variant={variant}
            {...field}
            {...rest}
            error={!!fieldState.error?.message || rest.error}
            ref={null}
            onChange={(e, child) => {
              const { onChange } = rest

              if (onChange) {
                onChange(e, child)
              } else {
                field.onChange(e)
              }
            }}
          />

          <FormHelperText>{getHelperText(fieldState)}</FormHelperText>
        </FormControl>
      )}
      {...hookFormProps}
    />
  )
}

export { RHFSelectField }
