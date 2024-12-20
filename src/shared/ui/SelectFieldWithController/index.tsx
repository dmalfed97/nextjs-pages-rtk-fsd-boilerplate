import type { ReactNode } from 'react'
import React from 'react'
import type { SelectProps, SelectVariants } from '@mui/material'
import { FormControl, InputLabel, Select, FormHelperText } from '@mui/material'
import type { UseWatchProps, FieldPath, FieldValues, ControllerFieldState } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

import { useStyles } from './index.styled'

interface SelectFieldWithControllerProps<T extends FieldValues>
  extends Omit<SelectProps, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
  variant?: SelectVariants
  helperText?: ReactNode
}

/**
 * Select с react-hook-form Controller
 * @param name - для react-hook-form Controller
 * @param hookFormProps
 * @param variant
 * @param helperText
 * @param rest - наследуются от SelectProps
 */
const SelectFieldWithController = function <T extends FieldValues>({
  name,
  hookFormProps,
  variant = 'outlined',
  helperText,
  ...rest
}: SelectFieldWithControllerProps<T>) {
  const { t } = useTranslation('common')

  const { classes } = useStyles()

  // Handlers
  const getHelperText = (fieldState: ControllerFieldState): ReactNode => {
    if (fieldState.error?.type === 'server') {
      return fieldState.error?.message
    }
    if (fieldState.error?.message) {
      return t(fieldState.error?.message, { defaultValue: t('error.fieldError') })
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

export { SelectFieldWithController }
