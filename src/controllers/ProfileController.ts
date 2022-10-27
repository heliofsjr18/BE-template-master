import { Request, Response } from 'express';
import { ProfileDto } from '../dtos/profile.dto';
import ProfileService from '../services/profileService';

export default class ProfileController {

    private serviceInstance: ProfileService;

    constructor(serviceInstance = ProfileService) {
        this.serviceInstance = new serviceInstance();
    }

    public async depositBalance(req: Request, res: Response) {
        try {
            const app = req.app;
            const { userId } = req.params as {userId: string};
            const { ammountToDeposit } = req.body as {ammountToDeposit: number};
            await this.serviceInstance.depositBalance(app, userId, ammountToDeposit);
            return res.status(200).end();
        } catch (error) {
            console.log("ProfileController", JSON.stringify(error));
            if(error.status) return res.status(error.status).json(error.message);
            return res.status(500).json(error.message);
        }
    }

    public async getProfessionWithMostMoney(req: Request, res: Response) {
        try {
            const app = req.app;
            const queryObject = req.query as {start: any, end: any};
            const {start, end} = queryObject;
            const profileMostMoney: ProfileDto = await this.serviceInstance.getProfessionWithMostMoney(app, start, end);
            return res.status(200).json(profileMostMoney);
        } catch (error) {
            console.log("ProfileController", JSON.stringify(error));
            if(error.status) return res.status(error.status).json(error.message);
            return res.status(500).json(error.message);
        }
    }

    public async getClientsThatMostPaid(req: Request, res: Response) {
        try {
            const app = req.app;
            const queryObject = req.query as {start: any, end: any, limit: any};
            const {start, end, limit} = queryObject;
            const profileMostMoney: ProfileDto = await this.serviceInstance.getClientsThatMostPaid(app, start, end, limit);
            return res.status(200).json(profileMostMoney);
        } catch (error) {
            console.log("ProfileController", JSON.stringify(error));
            if(error.status) return res.status(error.status).json(error.message);
            return res.status(500).json(error.message);
        }
    }

}
