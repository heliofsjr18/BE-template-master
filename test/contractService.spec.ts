import ContractService from '../src/services/constractService';
import { ProfileDto, ProfileEnum } from '../src/dtos/profile.dto';

describe('ContractService', () => {
  let service: ContractService;
  const mockedFindOne: ProfileDto = {
    balance: 2000,
    createdAt: new Date(),
    firstName: 'fake first name',
    id: 'any id',
    lastName: 'fake last name',
    profession: 'fake profession',
    type: ProfileEnum.CONTRACTOR,
    updatedAt: new Date(),
  }
  const mockedFindAll: ProfileDto[] = [
    {
      balance: 2000,
      createdAt: new Date(),
      firstName: "fake first name",
      id: "any id",
      lastName: "fake last name",
      profession: "fake profession",
      type: ProfileEnum.CONTRACTOR,
      updatedAt: new Date(),
    },
    {
      balance: 2000,
      createdAt: new Date(),
      firstName: "fake first name 2",
      id: "any id 2",
      lastName: "fake last name 2",
      profession: "fake profession 2",
      type: ProfileEnum.CONTRACTOR,
      updatedAt: new Date(),
    },
  ];
  const mockedApp = {
    get: jest.fn((mockedString: string) => {
        return {
          Contract: {
            findOne: jest.fn(() => mockedFindOne),
            findAll: jest.fn(() => mockedFindAll),
          }
        }
    }),
  }
  beforeEach(() => {
    jest.resetModules();
    service = new ContractService();
  })
  test('getContractById', async () => {
    const anyId = 'any Id';
    const anyProfileId = 'any profile Id';
    const response = await service.getContractById( mockedApp, anyId, anyProfileId);
    expect(response).toBeDefined();
  });
  test('getContractsByUser', async () => {
    const anyId = 'any Id';
    const response = await service.getContractsByUser( mockedApp, anyId);
    expect(response).toBeDefined();
  });
})