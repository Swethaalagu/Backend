import { register,login,myprofile,editprofile,deleteAcc} from "../controller/user.js";
import getAllUser from "../controller/admin.js";
import express from 'express'
import auth from '../middleware/auth.js'
import user from '../middleware/user.js'
import admin from "../middleware/admin.js";

const router=express.Router()

router.post('/register',register);
router.post('/login',login);
router.get('/viewall',[auth,admin],getAllUser);
router.get('/profile',[auth,user],myprofile);
router.put('/editprofile',[auth,user],editprofile);
router.delete('/deleteAcc',[auth,user],deleteAcc)



export default router