import * as Yup from 'yup'

import { RegistrationFormFields } from '~entities/auth'
// import { Sex } from '~shared/types/sex'
import {
  // firstNameValidation,
  // inputFieldValidation,
  // lastNameValidation,
  emailValidation,
  passwordValidation,
  // dateValidation,
} from '~shared/utils/yupValidations'

export const RegistrationValidationSchema = Yup.object({
  [RegistrationFormFields.email]: emailValidation,
  [RegistrationFormFields.password]: passwordValidation,
  [RegistrationFormFields.passwordConfirm]: passwordValidation.oneOf([Yup.ref('password')]),
  // [RegistrationFormFields.firstName]: firstNameValidation,
  // [RegistrationFormFields.lastName]: lastNameValidation,
  // [RegistrationFormFields.dateOfBirth]: dateValidation,
  // [RegistrationFormFields.location]: inputFieldValidation,
  // [RegistrationFormFields.sex]: Yup.mixed<Sex>().oneOf(Object.values(Sex)),
})
