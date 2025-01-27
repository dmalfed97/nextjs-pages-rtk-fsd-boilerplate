export enum LoginFormFields {
  email = 'email',
  password = 'password',
}

export type LoginFormValues = {
  [LoginFormFields.email]: string
  [LoginFormFields.password]: string
}
