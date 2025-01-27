import React, { useState, type FC } from 'react'

import { AuthLayout } from '~layouts/AuthLayout'

import { ConfirmationEmailSentStep } from './ConfirmationEmailSentStep'
import { SignUpFormStep } from './SignUpFormStep'
import { SignUpPageSteps } from './steps'

const SignUpPageContent: FC = () => {
  const [step, setStep] = useState<SignUpPageSteps>(SignUpPageSteps.FORM_STEP)

  // Handlers
  const submitFormCallback = (): void => {
    setStep(SignUpPageSteps.EMAIL_SENT_STEP)
  }

  // Renders
  return (
    <AuthLayout>
      {step === SignUpPageSteps.FORM_STEP && (
        <SignUpFormStep onSubmitCallback={submitFormCallback} />
      )}

      {step === SignUpPageSteps.EMAIL_SENT_STEP && <ConfirmationEmailSentStep />}
    </AuthLayout>
  )
}

export { SignUpPageContent }
