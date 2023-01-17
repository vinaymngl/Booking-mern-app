import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute  from "./routes/auth.js"
import hotelsRoute  from "./routes/hotels.js"
import roomsRoute  from "./routes/rooms.js"
import usersRoute  from "./routes/users.js"
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
mongoose.set("strictQuery",false)

const connect =  async () =>{
    try {
        mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
      } catch (error) {
        throw error;
      }
};

mongoose.connection.on("connected", () =>{
  console.log("Mongodb connected")
});

mongoose.connection.on("disconnected", () =>{
    console.log("Mongodb disconnected")
});
// app.use()
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/hotels",hotelsRoute);

app.use((err,req,res,next) => {
  const errStatus = err.status || 500;
  const errMessage = "something went wrong";
  return(res.status(errStatus).json({
    success : false,
    status :errStatus,
    message :errMessage,
  stack:err.stack}))
  next()
})


app.listen(8800, () =>{
    connect()
    console.log("connected")
});