import jwt from "jsonwebtoken";

function auth(req,res,next){
    const token=req.header('x-auth')
   
    if(!token)return res.status(401).send('access denied')
    try {
        
        const decode=jwt.verify(token,process.env.JWT_KEY)
        console.log(decode);
        req.user=decode
        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).send("invalid token"+error.message)
    }
}

export default auth