import { Request, Response } from 'express';
import { ContractControllerError } from '../errors/ContractControllerError';
import ContractService from '../services/constractService';

export default class ContractController {

    private serviceInstance: ContractService;

    constructor(serviceInstance = ContractService) {
        this.serviceInstance = new serviceInstance();
    }

    public async getContract(req: Request, res: Response) {
        try {
            const app = req.app;
            console.log(JSON.stringify(req.params));
            const { id } = req.params as {id: string};
            const profileId = req.get('profile_id') as string;
            const contractById = await this.serviceInstance.getContractById(app, id, profileId);
            if(!contractById) throw new ContractControllerError(404, 'Contract not found');
            return res.status(200).json(contractById);
        } catch (error) {
            console.log("ContractController", JSON.stringify(error));
            if(error.status) return res.status(error.status).json(error.message);
            return res.status(500).json(error);
        }
    }

    public async getContracts(req: Request, res: Response) {
        try {
            const app = req.app;
            const profileId = req.get('profile_id') as string;
            const contracts = await this.serviceInstance.getContractsByUser(app, profileId);
            if(!contracts.length) throw new ContractControllerError(404, 'Contracts not found');
            return res.status(200).json(contracts);
        } catch (error) {
            console.log("ContractController", JSON.stringify(error));
            if(error.status) return res.status(error.status).json(error.message);
            return res.status(500).json(error);
        }
    }

}
