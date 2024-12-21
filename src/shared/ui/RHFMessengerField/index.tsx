import type { SelectProps, TextFieldProps } from '@mui/material'
import { InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState, useRef, type ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import type { FieldPath, FieldValues, UseWatchProps } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'

import { messengersList, type MessengersListItem } from './messengers'
import { MessengerEnum } from '../../types/messenger'
import { validateMessenger } from '../../utils/validation/validateMessenger'
import { validatePhone } from '../../utils/validation/validatePhone'

interface RHFTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
}
interface RHFSelectProps<T extends FieldValues>
  extends Omit<SelectProps<MessengerEnum>, 'variant'> {
  name: FieldPath<T>
  hookFormProps: Omit<UseWatchProps<T>, 'name' | 'render' | 'defaultValue'>
}

interface RHFMessengerFieldProps<T extends FieldValues> {
  label?: ReactNode
  selectProps: RHFSelectProps<T>
  inputProps: RHFTextFieldProps<T>
}

const RHFMessengerField = function <T extends FieldValues>({
  label,
  selectProps,
  inputProps,
}: RHFMessengerFieldProps<T>) {
  const { name: selectName, hookFormProps: selectHookFormProps, ...selectRest } = selectProps
  const { name: inputName, hookFormProps: inputHookFormProps, ...inputRest } = inputProps

  const { classes } = useStyles()

  const { watch } = useFormContext<T>()
  const selectedMessengerType = watch(selectName)

  const [selectedMessenger, setSelectedMessenger] = useState<MessengersListItem | undefined>(() =>
    messengersList.find((item) => item.value === selectedMessengerType)
  )
  const combinedInputRef = useRef<HTMLDivElement>(null)

  // Effects
  useEffect(() => {
    setSelectedMessenger(messengersList.find((item) => item.value === selectedMessengerType))
  }, [selectedMessengerType])

  // Renders
  return (
    <>
      {label && (
        <InputLabel
          className={classes.label}
          required={inputProps.required || selectProps.required}
        >
          {label}
        </InputLabel>
      )}

      <Stack direction="row" width="100%" className={classes.container} ref={combinedInputRef}>
        <Controller
          name={selectName}
          {...selectHookFormProps}
          render={({ field }) => (
            <Select
              {...field}
              {...selectRest}
              inputRef={field.ref}
              className={classes.select}
              renderValue={() => (
                <Stack direction="row" gap={1} alignItems="center">
                  <Image src={selectedMessenger?.image || ''} alt="selected-messenger-img" />
                </Stack>
              )}
            >
              {messengersList.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  <Stack direction="row" gap={1} alignItems="center">
                    <Image src={option.image} alt={option.key} />
                    <span>{option.key}</span>
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          )}
        />

        <Controller
          name={inputName}
          {...inputHookFormProps}
          render={({ field }) => (
            <TextField
              {...inputRest}
              {...field}
              fullWidth
              className={classes.input}
              InputProps={{
                startAdornment: selectedMessenger && (
                  <InputAdornment position="start" style={{ marginRight: 0 }}>
                    {selectedMessenger.inputMask}
                  </InputAdornment>
                ),
              }}
              inputRef={field.ref}
              onFocus={() => combinedInputRef?.current?.focus()}
              onBlur={() => combinedInputRef?.current?.blur()}
              // Пока не буду выносить ф-ию отсюда
              onChange={(event) => {
                let newValue = event.target.value
                if (
                  newValue.includes('http') &&
                  selectedMessenger?.value === MessengerEnum.TELEGRAM &&
                  newValue.includes('t.me')
                ) {
                  newValue = newValue.split('t.me/')[1]
                }

                if (
                  selectedMessenger?.value === MessengerEnum.WHATSAPP ||
                  selectedMessenger?.value === MessengerEnum.VIBER
                ) {
                  newValue = validatePhone(newValue)
                } else {
                  newValue = validateMessenger(newValue)
                }

                const newEvent = {
                  ...event,
                  target: {
                    ...event.target,
                    value: newValue,
                  },
                }

                field.onChange(newEvent)
              }}
            />
          )}
        />
      </Stack>
    </>
  )
}

const useStyles = makeStyles()(() => ({
  container: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    '&:focus': {},
  },
  select: {
    flexShrink: 0,
    '& > fieldset': {
      border: 'none!important',
    },
  },
  input: {
    '& .MuiOutlinedInput-root': {
      '& > fieldset': {
        border: 'none',
      },
    },
  },
  label: {
    marginBottom: 5,
  },
}))

export { RHFMessengerField }
