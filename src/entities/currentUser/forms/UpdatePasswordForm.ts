export enum UpdatePasswordFormFields {
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
}

export type UpdatePasswordFormValues = {
  [UpdatePasswordFormFields.oldPassword]: string
  [UpdatePasswordFormFields.newPassword]: string
}
