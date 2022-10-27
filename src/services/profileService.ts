import { Op } from 'sequelize';
import { ContractDto } from '../dtos/contract.dto';
import { JobDto } from '../dtos/job.dto';
import { ProfileDto, ProfileEnum } from '../dtos/profile.dto';


export default class ProfileService {

    constructor() {}

    public async depositBalance(app: any, userId: string, ammountToDeposit: number) : Promise<void> {
        try {
            const { Job, Contract, Profile } = app.get('models');
            const contracts: ContractDto[] = await Contract.findAll({ where: {
                [Op.and]: [
                    {[Op.or]: [ { status: 'new' }, { status: 'in_progress' }]},
                    {ClientId: userId}
                ]
            }});
            const contractIds = contracts.map((contract) => contract.id);
            const jobs: JobDto[] = await Job.findAll({ where: { ContractId: contractIds }});
            const profile: ProfileDto = await Profile.findOne({ where: { id: userId }});
            let totalToPay: number = 0;
            jobs.map((job) => totalToPay += job.price);
            if(ammountToDeposit > ((totalToPay * 25)/100) ) throw new Error('Can\'t deposit this ammount cause is higher then 25 per cent your toal jobs price');
            await Profile.update({ balance: profile.balance + ammountToDeposit }, { where: { id: userId }});
        } catch (error) {
            console.log("JobsService", JSON.stringify(error));
            throw error;
        }
    }

    public async getProfessionWithMostMoney(app: any, start: any, end: any) : Promise<ProfileDto> {
        try {
            let mostMoneyContractor: ProfileDto;
            const listOfAllJobsByContractor: (ProfileDto & {totalMoneyEarned: number})[] = [];
            const {Profile, Job, Contract} = app.get('models');
            const allContractorProfiles: ProfileDto[] = await Profile.findAll({ where: { type: ProfileEnum.CONTRACTOR }});
            for (let index = 0; index < allContractorProfiles.length; index++) {
                const contractor = allContractorProfiles[index];
                const allContracts: ContractDto[] = await Contract.findAll({ where: { ContractorId: contractor.id }});
                const allContractsIds = allContracts.map((contract) => contract.id);
                const allJobs: JobDto[] = await Job.findAll({ where: { id: allContractsIds }});
                let totalEarned: number = 0;
                allJobs.map((job) => totalEarned += job.price);
                listOfAllJobsByContractor.push({ ...contractor, totalMoneyEarned: totalEarned });
            }
            mostMoneyContractor = listOfAllJobsByContractor.sort((a, b ) => a.totalMoneyEarned - b.totalMoneyEarned)[0];
            return mostMoneyContractor;
        } catch (error) {
            console.log("ContractService", JSON.stringify(error));
            throw error;
        }
    }

    public async getClientsThatMostPaid(app: any, start: any, end: any, limit: any) : Promise<ProfileDto> {
        try {
            let mostMoneyContractor: ProfileDto;
            const listOfAllJobsByClients: (ProfileDto & {totalMoneyPaid: number})[] = [];
            const {Profile, Job, Contract} = app.get('models');
            const allClientsProfiles: ProfileDto[] = await Profile.findAll({ where: { type: ProfileEnum.CLIENT }});
            for (let index = 0; index < allClientsProfiles.length; index++) {
                const client = allClientsProfiles[index];
                const allContracts: ContractDto[] = await Contract.findAll({ where: { ClientId: client.id }});
                const allContractsIds = allContracts.map((contract) => contract.id);
                const allJobs: JobDto[] = await Job.findAll({ where: { id: allContractsIds }});
                let totalPaid: number = 0;
                allJobs.map((job) => totalPaid += job.price);
                listOfAllJobsByClients.push({ ...client, totalMoneyPaid: totalPaid });
            }
            mostMoneyContractor = listOfAllJobsByClients.sort((a, b ) => a.totalMoneyPaid - b.totalMoneyPaid)[0];
            return mostMoneyContractor;
        } catch (error) {
            console.log("ContractService", JSON.stringify(error));
            throw error;
        }
    }
}