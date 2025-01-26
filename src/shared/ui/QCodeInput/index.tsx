import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type FC } from 'react'
import VerificationInput, { type VerificationInputProps } from 'react-verification-input'
import { makeStyles } from 'tss-react/mui'

interface QCodeInputProps extends VerificationInputProps {
  codeIsInvalid?: boolean
}

const QCodeInput: FC<QCodeInputProps> = ({ classNames, codeIsInvalid, ...rest }) => {
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

const useStyles = makeStyles()((theme) => ({
  container: {
    '&.error': {
      border: `1px solid ${theme.palette.error.main}`,
    },
  },
  character: {},
  characterSelected: {},
  error: {
    color: theme.palette.error.main,
    fontSize: 10,
  },
}))

export { QCodeInput }
