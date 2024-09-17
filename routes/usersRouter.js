const express=require('express');
const router=express.Router();
const userValidate=require('../middlewares/validateUser')


const {getAllUsers,login,signup,getuserbyId,updateuser,authentication}=require('../controllers/userController.js');


router.get('/',authentication,getAllUsers);
router.post('/login',userValidate,login);
router.post('/',userValidate,signup);
router.get('/:id',authentication,getuserbyId);
// router.put('/:id',authentication,userValidate,updateuser);


module.exports=router;