export type ContractDto = {
  id: string,
  terms: string,
  status: StatusEnum,
  ContractorId: string,
  ClientId: string,
  createdAt: Date,
  updatedAt: Date
}


enum StatusEnum {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  TEMINATED = "terminated",
};
