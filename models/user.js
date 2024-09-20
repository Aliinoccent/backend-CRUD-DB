const { default: mongoose } = require('mongoose')
const monooges=require('mongoose')
const userSchema=monooges.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hash:{
        type:String,
        required:true
    },
    // phone:{
    //     type:Number,
    //     required:true
    // },
    createdAt: {
        type: Date,
        default: Date.now,
      }
})
module.exports=mongoose.model('User',userSchema);