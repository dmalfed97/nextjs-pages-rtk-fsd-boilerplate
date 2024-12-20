// import { Sex } from '~shared/types/sex'

export enum RegistrationFormFields {
  email = 'email',
  password = 'password',
  passwordConfirm = 'passwordConfirm',
  // firstName = 'firstName',
  // lastName = 'lastName',
  // dateOfBirth = 'dateOfBirth',
  // location = 'location',
  // sex = 'sex',
}

export type RegistrationFormValues = {
  [RegistrationFormFields.email]: string
  [RegistrationFormFields.password]: string
  [RegistrationFormFields.passwordConfirm]: string
  // [RegistrationFormFields.firstName]: string | null
  // [RegistrationFormFields.lastName]: string | null
  // [RegistrationFormFields.dateOfBirth]: string | null
  // [RegistrationFormFields.location]: string | null
  // [RegistrationFormFields.sex]: Sex
}
