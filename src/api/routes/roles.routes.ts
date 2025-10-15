import { Router } from "express";
import { RolesController } from "../controller/RolesController";

const router = Router();

const roleController = new RolesController();
router.post("/",roleController.createRole);
router.put("/:id",roleController.updateRole);
router.get("/",roleController.getAll);
router.get("/:id",roleController.getRoleById);
router.get("/:roleName",roleController.getRoleByName);
router.delete("/:id",roleController.deleteRoleById);
export default router;