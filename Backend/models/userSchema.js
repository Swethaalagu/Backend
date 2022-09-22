import mongoose from 'mongoose'


const user={
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isCustomer:{
        type:Boolean,
        default:true
    }

}

const User=mongoose.model('User',user)

export default User