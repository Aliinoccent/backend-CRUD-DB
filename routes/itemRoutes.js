const express = require('express');
const router = express.Router();
const{ authentication}=require('../controllers/userController.js')

const {
  getItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,

} = require('../controllers/itemController.js');

const validateItem = require('../middlewares/validateRequest.js');
router.use(authentication)
router.get('/',getItems);
router.post('/',createItem);
router.get('/:id',getItemById);
router.put('/:id',validateItem,updateItem);
router.delete('/:id',deleteItem)

module.exports=router