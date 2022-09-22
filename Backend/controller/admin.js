
import User from "../models/userSchema.js"


//View all user

const getAllUser=(req,res)=>{
    async function Data(){
 try{
        const result=await User.find().select('-password')
         return   res.status(200).send(result);
       
  
    }
    catch (error) {
      return  res.status(400).send(error.message)
     }
  }
  Data();
  }

  


  export  default getAllUser