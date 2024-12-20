import React, { useState, type FC } from 'react'

import { AuthLayout } from '~layouts/AuthLayout'

import { SignInPageSteps } from './steps'
import { SignInFormStep } from './SignUpFormStep'
import { ConfirmationEmailSentStep } from './ConfirmationEmailSentStep'

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
