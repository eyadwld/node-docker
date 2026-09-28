import { Router } from "express";

import { signup, login } from "../controllers/auth-controller.js";

const router = new Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
