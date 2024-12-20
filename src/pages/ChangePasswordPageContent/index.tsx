import type { ReactElement } from 'react'
import React, { useState } from 'react'

import { AuthLayout } from '~layouts/AuthLayout'

import { ChangePasswordPageSteps } from './steps'
import { ChangePasswordFormStep } from './ChangePasswordFormStep'
import { SuccessStep } from './SuccessStep'

const ChangePasswordPageContent = (): ReactElement => {
  const [step, setStep] = useState<ChangePasswordPageSteps>(ChangePasswordPageSteps.FORM_STEP)

  // Handlers
  const submitFormCallback = (): void => {
    setStep(ChangePasswordPageSteps.SUCCESS_STEP)
  }

  // Renders
  return (
    <AuthLayout>
      {step === ChangePasswordPageSteps.FORM_STEP && (
        <ChangePasswordFormStep submitFormCallback={submitFormCallback} />
      )}

      {step === ChangePasswordPageSteps.SUCCESS_STEP && <SuccessStep />}
    </AuthLayout>
  )
}

export { ChangePasswordPageContent }
