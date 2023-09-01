import  express  from "express";
import { login, register,checkDetails,loginController,signupController } from "../controllers/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/check",checkDetails);
router.post("/signin",loginController);
router.post("/signin",signupController);



export default router;