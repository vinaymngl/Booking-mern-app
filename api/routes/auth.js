import  express  from "express";
import { login, register,checkDetails } from "../controllers/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/check",checkDetails);


export default router;