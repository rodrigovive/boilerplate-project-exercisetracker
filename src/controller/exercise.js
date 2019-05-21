const Exercise = require('../models/Exercise');
const User = require('../models/User');

exports.create = async ( req, res) => {
  
  const {
    body : {
      userId,
      description,
      duration,
      date
    }
  } = req;
  try{
    const user = await User.findOne({_id: userId});
    if(!user){
      return res.status(404).send({
        error: 'User not found'
      })
    };
    const exercise = new Exercise({
      userId: user._id,
      description,
      duration,
      date: date || new Date()
    });
    await exercise.save();
    const exerciseObject = exercise.toObject();
    exerciseObject.date = new Date(exercise.date).toDateString();
    delete exerciseObject.userId;
    delete exerciseObject.__v;
    if(exercise.date){
      exercise.date = exercise.date.toDateString();
    }
    res.status(201).send({
      username: user.username, 
      ...exerciseObject
    });
  }catch(e){
    res.status(500).send({
      error: e.toString()
    });
  }
}

exports.getExerciseFromUser = async (req,res) => {
  
  const { query: {userId, limit, from} } = req;
  const match = {};
  try{
    const user = await User.findOne({_id: userId});
    if(!user){
      return res.status(404).send({
        error: 'User not found'
      })
    }
    
    if(from){
      match.date = {
        "$gte": new Date(from)
      }
    }
    await user.populate({
      path: 'exercises',
      match,
      options: {
        limit: parseInt(limit)
      }
    }).execPopulate();
    res.status(200).send({
      _id: user._id,
      username: user.username, 
      count: user.exercises.length,
      log: user.exercises,
    })
    
  }catch(e){
    res.status(500).send({
      error: e.toString()
    })
  }
  
}