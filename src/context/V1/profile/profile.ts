import { Router } from "express";
import ProfileController from '../../../controllers/ProfileController';
import { getProfile } from '../../../middleware/getProfile';

const router = Router();

const controller = new ProfileController();

router.post('/balances/deposit/:userId', getProfile, async (req, res, next) => {
    return await controller.depositBalance(req, res);
})

router.get('/admin/best-profession', getProfile, async (req, res, next) => {
    return await controller.getProfessionWithMostMoney(req, res);
})

router.get('/admin/best-clients', getProfile, async (req, res, next) => {
    return await controller.getClientsThatMostPaid(req, res);
})


export default router;