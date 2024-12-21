import * as Yup from 'yup'

import { UpdatePasswordFormFields } from '~entities/currentUser'
import { passwordValidation } from '~shared/utils/yupValidations'

export const UpdatePasswordValidationSchema = Yup.object({
  [UpdatePasswordFormFields.oldPassword]: passwordValidation,
  [UpdatePasswordFormFields.newPassword]: passwordValidation,
})
