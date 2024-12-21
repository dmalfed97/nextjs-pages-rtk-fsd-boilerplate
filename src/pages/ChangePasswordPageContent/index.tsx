import React, { useState, type FC } from 'react'

import { AuthLayout } from '~layouts/AuthLayout'

import { ChangePasswordFormStep } from './ChangePasswordFormStep'
import { ChangePasswordPageSteps } from './steps'
import { SuccessStep } from './SuccessStep'

const ChangePasswordPageContent: FC = () => {
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
