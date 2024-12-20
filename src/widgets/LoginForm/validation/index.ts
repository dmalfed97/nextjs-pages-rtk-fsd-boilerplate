import * as Yup from 'yup'

import { LoginFormFields } from '~entities/auth'
import { emailValidation, passwordValidation } from '~shared/utils/yupValidations'

export const LoginValidationSchema = Yup.object({
  [LoginFormFields.email]: emailValidation.required('validation:inputField.required'),
  [LoginFormFields.password]: passwordValidation,
})
