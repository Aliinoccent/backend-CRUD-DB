
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
});

module.exports = mongoose.model('Item', ItemSchema);
