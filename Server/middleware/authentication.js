const jwt = require('jsonwebtoken');

const authentication = (req,res,next)=>{
    try{
        const token = req.header('AuthToken')
        if(!token){
            return res.status(400).json({ error : "Authenticate with valid user"})
        }
        console.log(token);
        const data = jwt.verify(token,process.env.WEBTOKEN);
        req.userId = data.user.id;
        next();
    }
    catch(error){
        return res.status(400).json({error : "Some error to authenticate user"})
    }
}

module.exports = authentication;