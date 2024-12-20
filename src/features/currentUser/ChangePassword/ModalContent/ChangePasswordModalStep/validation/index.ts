import * as Yup from 'yup'

import { passwordValidation } from '~shared/utils/yupValidations'
import { UpdatePasswordFormFields } from '~entities/currentUser'

export const UpdatePasswordValidationSchema = Yup.object({
  [UpdatePasswordFormFields.oldPassword]: passwordValidation,
  [UpdatePasswordFormFields.newPassword]: passwordValidation,
})
