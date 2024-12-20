import * as Yup from 'yup'

import { emailValidation } from '~shared/utils/yupValidations'
import { RestorePasswordRequestFormFields } from '~entities/auth'

export const RestorePasswordRequestValidationSchema = Yup.object({
  [RestorePasswordRequestFormFields.email]: emailValidation,
})
