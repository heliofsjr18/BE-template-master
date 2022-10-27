export type ProfileDto = {
  id: string,
  firstName: string,
  lastName: string,
  profession: string,
  balance: number,
  type: ProfileEnum,
  createdAt: Date,
  updatedAt: Date
}

export enum ProfileEnum {
  CLIENT = "client",
  CONTRACTOR = "contractor"
}
