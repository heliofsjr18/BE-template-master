import { Router } from "express";
import health from "./health/getHealth";
import contract from "./contract/contract";
import jobs from "./job/job";
import profile from "./profile/profile";

const router = Router();

router.use('/health', health);
router.use('/contracts', contract);
router.use('/jobs', jobs);
router.use('/', profile);

export default router;