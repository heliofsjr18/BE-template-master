import { Op } from 'sequelize';
import { ContractDto } from '../dtos/contract.dto';
import { JobDto } from '../dtos/job.dto';
import { ProfileDto, ProfileEnum } from '../dtos/profile.dto';


export default class JobsService {

    constructor() {}

    public async getUnpaidJobs(app: any, profileId: string) : Promise<any> {
        try {
            const { Job, Contract } = app.get('models');
            const contracts: ContractDto[] = await Contract.findAll({ where: {
                [Op.and]: [
                    {[Op.or]: [ { status: 'new' }, { status: 'in_progress' }]},
                    {[Op.or]: [ { ContractorId: profileId }, { ClientId: profileId }]}
                ]
            }});
            const contractIds = contracts.map((contract) => contract.id);
            const jobs: JobDto[] = await Job.findAll({ where: {
                [Op.and]: [
                    { ContractId: contractIds },
                    { paid: null }
                ]
            }});
            return jobs;
        } catch (error) {
            console.log("JobsService", JSON.stringify(error));
            throw error;
        }
    }

    public async payJob(app: any, profileId: string, jobId: string) : Promise<void> {
        try {
            const {Profile, Job, Contract} = app.get('models');
            const clientProfile: ProfileDto = await Profile.findOne({ where: { id: profileId }});
            const job: JobDto = await Job.findOne({ where: { id: jobId }});
            const contract: ContractDto = await Contract.findOne({ where: { id: job.ContractId }});
            const contractorProfile: ProfileDto = await Profile.findOne({ where: { id: contract.ContractorId }});
            if(clientProfile.type === ProfileEnum.CONTRACTOR) throw new Error('Can\'t be operated by this profile');
            if(clientProfile.balance < job.price) throw new Error('Can\'t be operated cause you dont\'have the ammount');
            await Profile.update({ balance: clientProfile.balance - job.price }, { where: { id: profileId }});
            await Profile.update({ balance: contractorProfile.balance + job.price }, { where: { id: contractorProfile.id }});
            await Job.update({ paid : 1, paymentDate: Date.now() }, { where: { id: jobId }});
        } catch (error) {
            console.log("ContractService", JSON.stringify(error));
            throw error;
        }
    }
}