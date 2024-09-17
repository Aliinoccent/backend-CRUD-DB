const joi =require('joi');
const userValidation=(req,res,next)=>{
    const userSchema=joi.object({
        name:joi.string().required().min(3),
        email:joi.string().required().email(),
        password:joi.string().required().min(3),
        // phone:joi.number().min(2)
        })
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    }
module.exports=userValidation;