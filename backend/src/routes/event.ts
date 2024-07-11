import { EventController } from "@src/controller/Event";
import { Router } from "express";

const router = Router();

router.post("/", EventController.create);
router.get("/:id", EventController.list);
router.patch("/:eventId", EventController.update);
router.delete("/:eventId", EventController.delete);
router.get("/:eventId", EventController.getById);

export default router