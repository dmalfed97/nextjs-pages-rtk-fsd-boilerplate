import * as Yup from 'yup'

import { RestorePasswordRequestFormFields } from '~entities/auth'
import { emailValidation } from '~shared/utils/yupValidations'

export const RestorePasswordRequestValidationSchema = Yup.object({
  [RestorePasswordRequestFormFields.email]: emailValidation,
})
