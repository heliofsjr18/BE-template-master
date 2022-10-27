import { Op } from 'sequelize';
import { ContractDto } from '../dtos/contract.dto';


export default class ContractService {

    constructor() {}

    public async getContractById(app: any, id: string, profileId: string) : Promise<any> {
        try {
            const {Contract} = app.get('models');
            const contract: ContractDto = await Contract.findOne({where: {
                [Op.and]: [
                    {id},
                    {[Op.or]: [ { ContractorId: profileId }, { ClientId: profileId }]}
                ]}});
            return contract;
        } catch (error) {
            console.log("ContractService", JSON.stringify(error));
            throw error;
        }
    }

    public async getContractsByUser(app: any, profileId: string) : Promise<any> {
        try {
            const {Contract} = app.get('models');
            const contracts: ContractDto[] = await Contract.findAll({ where: {
                [Op.and]: [
                    {[Op.or]: [ { status: 'new' }, { status: 'in_progress' }]},
                    {[Op.or]: [ { ContractorId: profileId }, { ClientId: profileId }]}
                ]
            }});
            console.log(contracts);
            return contracts;
        } catch (error) {
            console.log("ContractService", JSON.stringify(error));
            throw error;
        }
    }
}