function admin(req,res,next){
    if(req.user.isCustomer) return res.status(403).send('access denied')
    next()
 }
 
 
 export default admin