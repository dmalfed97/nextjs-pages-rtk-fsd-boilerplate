import type { ReactElement } from 'react'
import React from 'react'
import { makeStyles } from 'tss-react/mui'
import type { VerificationInputProps } from 'react-verification-input'
import VerificationInput from 'react-verification-input'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface CodeInputProps extends VerificationInputProps {
  codeIsInvalid?: boolean
}

const CodeInput = ({ classNames, codeIsInvalid, ...rest }: CodeInputProps): ReactElement => {
  const { t } = useTranslation('common')

  const { classes, cx } = useStyles()

  // Renders
  return (
    <Stack gap={1}>
      <VerificationInput
        {...rest}
        classNames={{
          ...classNames,
          container: cx(classes.container, classNames?.container, { error: codeIsInvalid }),
          character: cx(classes.character, classNames?.character),
          characterSelected: cx(classes.characterSelected, classNames?.characterSelected),
        }}
      />

      {codeIsInvalid && (
        <Typography variant="body1" className={classes.error}>
          {t('codeInput.incorrectCode')}
        </Typography>
      )}
    </Stack>
  )
}

const useStyles = makeStyles()(() => ({
  container: {
    '&.error': {
      border: '1px solid red',
    },
  },
  character: {},
  characterSelected: {},
  error: {
    color: 'red',
    fontSize: 10,
  },
}))

export { CodeInput }
