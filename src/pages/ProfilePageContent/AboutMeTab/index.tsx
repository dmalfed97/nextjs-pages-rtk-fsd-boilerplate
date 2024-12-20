import React from 'react'
import type { ReactElement } from 'react'
import { Stack } from '@mui/material'

import { DescriptionBlock } from './DescriptionBlock'

const AboutMeTab = (): ReactElement => {
  return (
    <Stack gap={5}>
      <DescriptionBlock />
    </Stack>
  )
}

export { AboutMeTab }
