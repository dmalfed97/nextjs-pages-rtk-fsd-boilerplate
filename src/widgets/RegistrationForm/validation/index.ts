import * as Yup from 'yup'

import { RegistrationFormFields } from '~entities/auth'
// import { Sex } from '~shared/types/sex'
import {
  // firstNameValidation,
  // inputFieldValidation,
  // lastNameValidation,
  emailValidation,
  passwordValidation,
} from '~shared/utils/yupValidations'

export const RegistrationValidationSchema = Yup.object({
  [RegistrationFormFields.email]: emailValidation.required('validation:inputField.required'),
  [RegistrationFormFields.password]: passwordValidation,
  [RegistrationFormFields.passwordConfirm]: passwordValidation.oneOf([Yup.ref('password')]),
  // [RegistrationFormFields.firstName]: firstNameValidation,
  // [RegistrationFormFields.lastName]: lastNameValidation,
  // [RegistrationFormFields.sex]: Yup.mixed<Sex>().oneOf(Object.values(Sex)),
})

export type RegistrationValidationSchemaType = Yup.InferType<typeof RegistrationValidationSchema>
