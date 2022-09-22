import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/userSchema.js"
import Joi from "joi"
import user from '../middleware/user.js';


const saltRounds=10;

const schema = Joi.object({
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string().required()
})

const logschema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required()
  })

  
//register 

const register= async (req, res) => {
const { error } =schema.validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const email=req.body.email;
  const exUser= await User.findOne({email:email})
  if(exUser){
    res.send('Email is already taken')
  }
  else{
      bcrypt.hash(req.body.password,saltRounds,async function (err,hash){
        let user = new User({ 
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          email: req.body.email,
          password: hash
        });
        user = await  user.save();
        console.log(user);
        res.send(user);
    })
  }
};




 //login user
 
  
  const login= async (req, res) => {
      const { error } =logschema.validate(req.body); 
      if (error) return res.status(400).send(error.details[0].message);
    
      const email=req.body.email;
      const password=req.body.password
      const exUser= await User.findOne({email:email})
      if(!exUser){
        return res.status(400).send("Incorrect Email Id or Password")
      }
      if(exUser){
         bcrypt.compare(password,exUser.password,async function(err,result){
                if (result) {
                  let data=exUser.toObject();
                      const token=jwt.sign({_id:data._id,isCustomer:exUser.isCustomer,email:exUser.email},process.env.JWT_KEY)
                      // res.send(token)
                      res.header("x-auth",token).send(token)
                }else{
                    res.send("Acces Denied")
                }
          }) 
      }
      else{
        res.send('Your mail id and password is not matching')
      }
    
    
    };

 
  //view profile

  const myprofile=async(req, res) => {
    
    const users = await User.find({email:req.user.email}).select('-password -isCustomer');
    res.send(users);
  }; 

  //edit profile

  const editprofile=async(req, res) => {
    bcrypt.hash(req.body.password,saltRounds,async function (err,hash){
    var newUser={
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      password:hash,    
          }
    const user = await User.findByIdAndUpdate((req.user._id),{$set:{firstname:newUser.firstname,
                                                        lastname:newUser.lastname,password:newUser.password}},{new:true})
                             .select('-isCustomer');
    if(user){
      res.send(user); 
    }
    else{
      res.send("update failed");
    }
  })
  };


  //delete account
 
 const deleteAcc=async (req,res)=>{
 
    try{

      let user=await User.findOneAndDelete({email:req.body.email})
      if(user){
        // console.log("Your Account deleted successfully");
        res.send("Your Account Deleted successfully ")
     }
     else{
      // console.log("something went wrong")
      res.send("something went wrong")
         }
    }
    catch(error){
      console.log(error)
    }
 }




export {register,login,myprofile,editprofile,deleteAcc}