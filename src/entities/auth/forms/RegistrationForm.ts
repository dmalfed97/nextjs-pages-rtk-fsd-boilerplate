// import { Sex } from '~shared/types/sex'

export enum RegistrationFormFields {
  email = 'email',
  password = 'password',
  passwordConfirm = 'passwordConfirm',
  // firstName = 'firstName',
  // lastName = 'lastName',
  // sex = 'sex',
}

export type RegistrationFormValues = {
  [RegistrationFormFields.email]: string
  [RegistrationFormFields.password]: string
  [RegistrationFormFields.passwordConfirm]: string
  // [RegistrationFormFields.firstName]: string | null
  // [RegistrationFormFields.lastName]: string | null
  // [RegistrationFormFields.sex]: Sex
}
