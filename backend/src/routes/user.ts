import { Router } from "express";
import { UserController } from "@src/controller/User";
const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/recover", UserController.recover);
router.get("/:id", UserController.getProfile);
router.get("/", UserController.getAll);
router.patch("/:id", UserController.updateProfile);
router.patch("/:id/recover", UserController.changePassword)

export default router