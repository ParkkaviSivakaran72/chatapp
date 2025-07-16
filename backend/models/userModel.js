import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    resetOTP:{type:String},
    isVerified:{type:Boolean, default:false},
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel;