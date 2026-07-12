const jwt=require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"Unauthorized"});
    }
    const token=authHeader.substring(7);
    try{

        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(403).json({message:"Invalid token"});
            }
            req.user=user;
            next();
        });
    }catch(err){
        return res.status(403).json({message:"Invalid token"});
    }
}

module.exports=authMiddleware;