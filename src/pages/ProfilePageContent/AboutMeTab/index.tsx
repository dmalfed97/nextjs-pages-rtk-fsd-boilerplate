import { Stack } from '@mui/material'
import React, { type FC } from 'react'

import { DescriptionBlock } from './DescriptionBlock'

const AboutMeTab: FC = () => {
  return (
    <Stack gap={5}>
      <DescriptionBlock />
    </Stack>
  )
}

export { AboutMeTab }
