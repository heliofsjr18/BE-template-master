import { Router } from "express";
import JobsController from '../../../controllers/JobsController';
import { getProfile } from '../../../middleware/getProfile';

const router = Router();

const controller = new JobsController();

router.get('/unpaid', getProfile, async (req, res, next) => {
    return await controller.getUnpaidJobs(req, res);
})

router.post('/:job_id/pay', getProfile, async (req, res, next) => {
    return await controller.payJobs(req, res);
})

export default router;