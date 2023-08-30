import  express  from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel, countByCity,countByType, getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/" , createHotel);
//UPDATE
router.put("/:id" ,verifyAdmin, updateHotel);
//GET
router.get("/find/:id" , getHotel);
//GET ALL
router.get("/" , getHotels); 
router.get("/countByCity" , countByCity); 
router.get("/countByType" , countByType); 
router.get("/room/:id",getHotelRooms);
//DELETE
router.delete("/:id" ,verifyAdmin, deleteHotel);
export default router;