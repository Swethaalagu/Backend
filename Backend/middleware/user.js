function user(req,res,next){
    if (req.user.isCustomer === false) return res.status(403).send("access denied");
  if (!req.user.isCustomer === false) {
    next();
  }
    
}
export default user;