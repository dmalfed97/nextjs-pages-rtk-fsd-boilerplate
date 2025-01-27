import type { OutlinedTextFieldProps } from '@mui/material'
import { InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import type { FieldPath, FieldValues, UseWatchProps } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { ParsedCountry } from 'react-international-phone'
import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from 'react-international-phone'

import { validatePhone } from '../../utils/validation/validatePhone'

import 'react-international-phone/style.css'

interface RHFPhoneFieldProps<T extends FieldValues>
  extends Omit<OutlinedTextFieldProps, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
}

// TODO Add validation with google-libphonenumber
// 1 problem - linking with yup
// 2 problem - 500kb
const RHFPhoneField = function <T extends FieldValues>({
  name,
  hookFormProps,
  ...rest
}: RHFPhoneFieldProps<T>) {
  const { i18n } = useTranslation()

  const { phone, handlePhoneValueChange, country, setCountry } = usePhoneInput({
    defaultCountry: i18n.language,
    value: rest.value as string,
    countries: defaultCountries,
  })

  // Renders
  const renderValue = (value: ParsedCountry) => (
    <FlagImage iso2={value.iso2} style={{ display: 'flex' }} />
  )

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          type="tel"
          {...field}
          inputRef={field.ref}
          value={phone}
          error={!!fieldState.error?.message}
          onChange={(event) => {
            // Potential problem here - only filtered by validatePhone symbols are provided to the event
            handlePhoneValueChange(event)

            const newEvent = {
              ...event,
              target: { ...event.target, value: validatePhone(handlePhoneValueChange(event)) },
            }

            field.onChange(newEvent)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: 2, marginLeft: -8 }}>
                <Select
                  MenuProps={{
                    style: {
                      height: 300,
                      width: 360,
                      top: 10,
                      left: -34,
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                  }}
                  sx={{
                    width: 'max-content',
                    // Remove default outline (display only on focus)
                    fieldset: {
                      display: 'none',
                    },
                    '&.Mui-focused:has(div[aria-expanded="false"])': {
                      fieldset: {
                        display: 'block',
                      },
                    },
                    // Update default spacing
                    '.MuiSelect-select': {
                      padding: '8px',
                      paddingRight: '24px !important',
                    },
                    svg: {
                      right: 0,
                    },
                  }}
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value as ParsedCountry['iso2'])
                  }}
                  renderValue={renderValue}
                >
                  {defaultCountries.map((c) => {
                    const country = parseCountry(c)

                    return (
                      <MenuItem key={country.iso2} value={country.iso2}>
                        <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />

                        <Typography mr="8px">{country.name}</Typography>

                        <Typography color="gray">+{country.dialCode}</Typography>
                      </MenuItem>
                    )
                  })}
                </Select>
              </InputAdornment>
            ),
          }}
          {...rest}
        />
      )}
      {...hookFormProps}
    />
  )
}

export { RHFPhoneField }
