import React, { useState, type FC } from 'react'

import { AuthLayout } from '~layouts/AuthLayout'

import { ConfirmationEmailSentStep } from './ConfirmationEmailSentStep'
import { SignInFormStep } from './SignUpFormStep'
import { SignInPageSteps } from './steps'

const SignUpPageContent: FC = () => {
  const [step, setStep] = useState<SignInPageSteps>(SignInPageSteps.FORM_STEP)

  // Handlers
  const submitFormCallback = (): void => {
    setStep(SignInPageSteps.EMAIL_SENT_STEP)
  }

  // Renders
  return (
    <AuthLayout>
      {step === SignInPageSteps.FORM_STEP && (
        <SignInFormStep onSubmitCallback={submitFormCallback} />
      )}

      {step === SignInPageSteps.EMAIL_SENT_STEP && <ConfirmationEmailSentStep />}
    </AuthLayout>
  )
}

export { SignUpPageContent }
