import { Stack, Container, ToggleButtonGroup, ToggleButton } from '@mui/material'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import React, { useState, useMemo, type FC, type MouseEvent } from 'react'

import { AvatarBlock } from './AvatarBlock'
import { UserNameBlock } from './UserNameBlock'

const AboutMeTab = dynamic(() => import('./AboutMeTab').then((m) => m.AboutMeTab))
const EmailOrPasswordTab = dynamic(() =>
  import('./EmailOrPasswordTab').then((m) => m.EmailOrPasswordTab)
)

enum ProfileTab {
  ABOUT_ME = 'aboutMe',
  EMAIL_OR_PASSWORD = 'emailOrPassword',
}

const ProfilePageContent: FC = () => {
  const { t } = useTranslation(['common', 'profile'])

  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.ABOUT_ME)

  const tabOptions = useMemo(
    () => [
      {
        value: ProfileTab.ABOUT_ME,
        label: t('button.aboutMe'),
      },
      {
        value: ProfileTab.EMAIL_OR_PASSWORD,
        label: t('button.emailAndPassword'),
      },
    ],
    [t]
  )

  // Handlers
  const handleChangeActiveTab = (e: MouseEvent, value: ProfileTab) => {
    e.stopPropagation()

    if (value) {
      setActiveTab(value)
    }
  }

  // Renders
  return (
    <Container maxWidth="md">
      <Stack gap={5}>
        <Stack gap={2}>
          {/* Name */}
          <UserNameBlock />

          {/* Avatar */}
          <AvatarBlock />
        </Stack>

        <ToggleButtonGroup
          onChange={handleChangeActiveTab}
          color="primary"
          value={activeTab}
          exclusive
          fullWidth
        >
          {tabOptions.map((item) => (
            <ToggleButton key={item.value} value={item.value} aria-label={item.value}>
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {activeTab === ProfileTab.ABOUT_ME && <AboutMeTab />}

        {activeTab === ProfileTab.EMAIL_OR_PASSWORD && <EmailOrPasswordTab />}
      </Stack>
    </Container>
  )
}

export { ProfilePageContent }
