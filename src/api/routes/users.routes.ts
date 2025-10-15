import { Router } from "express";
import { UserController } from "../controller/UserController";
import { RolesController } from "../controller/RolesController";


const router = Router();
const controller = new UserController();

router.post("/", controller.createUser);
router.get("/", controller.getAllUser);
router.get("/:id", controller.getUser);
router.put("/:id", controller.updateUser);
router.delete("/:id",controller.deleteUser);
router.post("/:getuserbyname",controller.getUserByName);


export default router;