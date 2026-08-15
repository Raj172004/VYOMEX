import { Router } from "express";
import clientController from "../controllers/Client.controller";
import { authenticate } from "../../../middleware/jwt.middleware";

const router = Router();

router.use(authenticate);

router.get("/", clientController.getClients.bind(clientController));
router.get("/:id", clientController.getById.bind(clientController));
router.post("/", clientController.create.bind(clientController));
router.put("/:id", clientController.update.bind(clientController));
router.patch("/:id", clientController.update.bind(clientController));
router.delete("/:id", clientController.delete.bind(clientController));

export default router;
