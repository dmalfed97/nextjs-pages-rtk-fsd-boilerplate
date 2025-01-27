import { LoadingButton } from '@mui/lab'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { type ChangeEvent, type FC } from 'react'
import { makeStyles } from 'tss-react/mui'

interface QImageInputProps {
  onSelectPhoto: (e: ChangeEvent<HTMLInputElement>) => void
  title?: string
  loading?: boolean
}

const QImageInput: FC<QImageInputProps> = ({ onSelectPhoto, title, loading = false }) => {
  const { t } = useTranslation('common')

  const { classes } = useStyles()

  // Renders
  return (
    <Stack className={classes.container} p={2.5} gap={1.5} alignItems="center">
      <Typography variant="body2">{title}</Typography>

      <LoadingButton
        loading={loading}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        size="small"
      >
        {t('button.browsePhoto')}

        <input className={classes.input} type="file" accept="image/*" onChange={onSelectPhoto} />
      </LoadingButton>
    </Stack>
  )
}

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRadius: theme.spacing(1.5),
    border: `1px solid ${theme.palette.grey['200']}`,
  },
  input: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  },
}))

export { QImageInput }
