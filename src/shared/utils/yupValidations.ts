import { isValid } from 'date-fns'
import * as Yup from 'yup'

import { PASSWORD_REGEX_CYRILLIC, PASSWORD_REGEX_SPACES, LOGIN_REGEX, EMAIL_REGEX } from './regex'

export const inputFieldValidation = Yup.string().max(200, 'validation:inputField.max')

export const textFieldValidation = Yup.string().max(1500, 'validation:textField.max')

export const loginValidation = inputFieldValidation
  .required('validation:inputField.required')
  .min(2, 'validation:login.min')
  .matches(RegExp(LOGIN_REGEX), 'validation:login.invalidSymbols')

export const emailValidation = inputFieldValidation.matches(
  RegExp(EMAIL_REGEX),
  'validation:email.incorrectFormat'
)

export const passwordValidation = inputFieldValidation
  .required('validation:inputField.required')
  .min(8, 'validation:password.min')
  .matches(RegExp(PASSWORD_REGEX_SPACES), 'validation:password.spaces')
  .matches(RegExp(PASSWORD_REGEX_CYRILLIC), 'validation:password.cyrillic')

export const firstNameValidation = inputFieldValidation.min(2, 'validation:firstName.min')

export const lastNameValidation = inputFieldValidation.min(2, 'validation:lastName.min')

export const dateValidation = Yup.string().test((schema) => isValid(schema))
