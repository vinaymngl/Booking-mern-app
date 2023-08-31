import mongoose, { Schema } from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required :true,
    },
    lastName:{
        type:String,
        requrired:true,
    },
    username :{
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
},
{timeStamp: true}
);

export default mongoose.model("User", UserSchema)