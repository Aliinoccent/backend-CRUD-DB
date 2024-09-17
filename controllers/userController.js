const { find } = require('../models/items');
const User=require('../models/user');
let jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
require('dotenv').config();
const Secratkey=process.env.Secrat_key


exports.authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) {
        // If token is missing, stop further execution
        return res.status(404).json({ Data: 'Token not found', success: false, statusCode: 404 });
    }

    // Verify the token
    jwt.verify(token, Secratkey, (error, user) => {
        if (error) {
            // If token is invalid or expired
            return res.status(401).json({ Data: 'Invalid or expired token', success: false, statusCode: 401 });
        }

        // If the token is valid, decoded will contain user info
        console.log('Token verification completed...');
        console.log(user, 'inside token');  // Logs decoded user data

        // Attach the decoded user info (e.g., user ID) to req.user for use in the next middleware
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    });
};

exports.getAllUsers=async(req,res)=>{
    const userdata=await User.find();
    try{
    if(!userdata){
        res.json({Data:'user not found',success:false, statusCode:404})
    }
    else{
        console.log(userdata,'this get all data of user')
        res.json({Data:userdata,success:true,statuscode:500})
    }
}
catch(error){
    res.json({Data:'frontend issue',statusCode:404,status:false})
}
}
exports.login=async(req,res)=>{
    const {email,name,password}=req.body
    console.log('email is ',email,Secratkey)
   const userfound=await User.findOne({email})
   if(!userfound){
    console.log(userfound,"email is invalid ")
    res.json({Data:'email is invalid',success:true,statuscode:404})
   }
   
    console.log(userfound,'this is user');
    const match=await bcrypt.compare(password,userfound.hash);
    if(match){
        const token=jwt.sign({ id: userfound._id},Secratkey, { expiresIn: '1h' })
        console.log(token,'this is token')
        res.json({tokens:token,Data:{name,email},success:true, statusCode:200})
    }
    else{
        res.json({Data:'notfound',success:true, statusCode:200})
    }
   
}  
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const exist = await User.findOne({ email });
        console.log(exist);  // Log the result of the existing user check
        
        if (exist) {
            return res.status(200).json({
                data: 'User already exists',
                success: false,  // Update success to false since the user already exists
                statusCode: 200
            });
        }
        
        // If the user does not exist, create a new user
        const hash = bcrypt.hashSync(password, 10);
        const newUser = new User({ name, email, hash });
        
        const userAdded = await newUser.save();
        console.log(userAdded, 'User has been added successfully');
        
        res.status(200).json({
            data: userAdded,
            success: true,
            statusCode: 200
        });
    } catch (error) {
        console.error('Error creating user:', error);  // Log the actual error for debugging
        res.status(500).json({
            data: 'User not created',
            success: false,  // Update success to false for failure
            statusCode: 500
        });
    }
};
exports.getuserbyId=async(req,res)=>{
const founduser=await User.findById(req.params.id)
console.log(founduser,'single user found');
try{
    if(founduser){
        res.json({Data:founduser,success:true,statusCode:200})
    }
    res.json({Data:'not found backend',success:false,statusCode:500})
}
catch(error){
    res.json({Data:'error from frontend',status:false,statusCode:404})
}
}