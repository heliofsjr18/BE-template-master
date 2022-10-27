import { Request, Response } from 'express';
import { JobDto } from '../dtos/job.dto';
import { JobsControllerError } from '../errors/JobsControllerError';
import JobsService from '../services/jobsService';

export default class JobsController {

    private serviceInstance: JobsService;

    constructor(serviceInstance = JobsService) {
        this.serviceInstance = new serviceInstance();
    }

    public async getUnpaidJobs(req: Request, res: Response) {
        try {
            const app = req.app;
            const profileId = req.get('profile_id') as string;
            const unpaidJobs: JobDto[] = await this.serviceInstance.getUnpaidJobs(app, profileId);
            if(!unpaidJobs.length) throw new JobsControllerError(404, 'Job not found');
            return res.status(200).json(unpaidJobs);
        } catch (error) {
            console.log("JobsController", JSON.stringify(error));
            if(error.status) return res.status(error.status).json(error.message);
            return res.status(500).json(error);
        }
    }

    public async payJobs(req: Request, res: Response) {
        try {
            const app = req.app;
            const profileId = req.get('profile_id') as string;
            const { job_id } = req.params as {job_id: string};
            await this.serviceInstance.payJob(app, profileId, job_id);
            return res.status(200).end();
        } catch (error) {
            console.log("JobsController", JSON.stringify(error));
            if(error.status) return res.status(error.status).json(error.message);
            return res.status(500).json(error.message);
        }
    }

}
