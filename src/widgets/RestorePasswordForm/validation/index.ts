import * as Yup from 'yup'

import { RestorePasswordFormFields } from '~entities/auth'
import { passwordValidation } from '~shared/utils/yupValidations'

export const RestorePasswordValidationSchema = Yup.object({
  [RestorePasswordFormFields.resetPasswordToken]: Yup.string(),
  [RestorePasswordFormFields.password]: passwordValidation,
  [RestorePasswordFormFields.passwordConfirm]: passwordValidation.oneOf([Yup.ref('password')]),
})
