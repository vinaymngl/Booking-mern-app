import  express  from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid" ,verifyAdmin, createRoom);
//UPDATE
router.put("/:id" ,verifyAdmin, updateRoom);
//UPDATE ROOM AVAILABILITY
router.put("/availability/:id" , updateRoomAvailability);
//GET
router.get("/:id" , getRoom);
//GET ALL
router.get("/" , getRooms); 
//DELETE
router.delete("/:id" ,verifyAdmin, deleteRoom);
export default router;