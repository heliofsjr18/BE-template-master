import { Router } from "express";
import health from "./health/getHealth";

const router = Router();

router.use('/health', health);

export default router;