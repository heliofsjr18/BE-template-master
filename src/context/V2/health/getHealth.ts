import { Router } from "express";

const router = Router();

router.get('/', (req, res, next) => {
    res.send('Everything is Good here on V2');
})

export default router;