import { Router } from "express";
import ContractController from '../../../controllers/contractController';
import { getProfile } from '../../../middleware/getProfile';

const router = Router();

const controller = new ContractController();

router.get('/:id', getProfile, async (req, res, next) => {
    return await controller.getContract(req, res);
})

router.get('/', getProfile, async (req, res, next) => {
    return await controller.getContracts(req, res);
})

export default router;