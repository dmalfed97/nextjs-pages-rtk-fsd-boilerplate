export enum RestorePasswordFormFields {
  resetPasswordToken = 'resetPasswordToken',
  password = 'password',
  passwordConfirm = 'passwordConfirm',
}

export type RestorePasswordFormValues = {
  [RestorePasswordFormFields.resetPasswordToken]: string
  [RestorePasswordFormFields.password]: string
  [RestorePasswordFormFields.passwordConfirm]: string
}
