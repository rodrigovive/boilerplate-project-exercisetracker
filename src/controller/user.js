const User = require('../models/User');

exports.create = async (req,res) => {
  
  const { body: {username} } = req;
  try{
    const user = new User({
      username
    })
    await user.save();
    
    res.status(201).send(user);
  }catch(e){
    res.status(500).send({
      error: e.toString()
    })
  }
  
}   

exports.getAll = async (req,res) => {
  
  try{
    
    const users = await User.find({});
    res.status(200).send(users);
    
  }catch(e){
    res.status(500).send({
      error: e.toString()
    })
  }
  
}