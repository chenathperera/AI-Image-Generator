import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name : { type : String , requred: true},
    email : { type : String , requred: true , unique : true},
    password : { type : String , requred: true},
    creditBalance : { type : Number , default:5},
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel