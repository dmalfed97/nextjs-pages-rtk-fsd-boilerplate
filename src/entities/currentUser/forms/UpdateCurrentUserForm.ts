export enum UpdateCurrentUserFormFields {
  firstName = 'firstName',
  lastName = 'lastName',
  description = 'description',
  experience = 'experience',
  userName = 'userName',
  location = 'location',
  latitude = 'latitude',
  longitude = 'longitude',
}

export type UpdateCurrentUserFormValues = {
  [UpdateCurrentUserFormFields.firstName]: string
  [UpdateCurrentUserFormFields.lastName]: string
  [UpdateCurrentUserFormFields.description]: string
  [UpdateCurrentUserFormFields.experience]: number | null
  [UpdateCurrentUserFormFields.userName]: string | null
  [UpdateCurrentUserFormFields.location]: string | null
  [UpdateCurrentUserFormFields.latitude]: number | null
  [UpdateCurrentUserFormFields.longitude]: number | null
}
