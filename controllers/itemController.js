const Item = require('../models/items.js');
const user = require('../models/user.js');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  
  const { name, quantity, price } = req.body;
  

  const newItem = new Item({ name, quantity, price,user:req.user.id});

  try {
    const item = await newItem.save();
    res.json({Data:[item],status:true,statusCode:200})
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateItembyUser= async(req,res)=>{
  const userId=req.params.userId;
  const itemId=req.params.itemid;
  console.log(req.user.id)
  console.log(userId)

  try{
    if(req.user.id===userId.trim()){
      console.log('is come inside users validation')
        const itemfound=await Item.findByIdAndUpdate(itemId,req.body,{
          new:true
        });
        return  res.json({Data:itemfound,status:"ok",succss:true})
        }
        else{
       return   res.json({Data:"user not found"})
        }
  
  }
  catch(error){
return res.json({Data:'backend issue',status:'not ok',success:false})
  }

}
