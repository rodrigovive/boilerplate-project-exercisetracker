const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description:{
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

exerciseSchema.methods.toJSON = function(){
  const exercise = this;
  const exerciseObject = exercise.toObject();
  delete exerciseObject._id;
  delete exerciseObject.userId;
  delete exerciseObject.__v;
  exerciseObject.date = new Date(exercise.date).toDateString();
  return exerciseObject;
}

const Exercise = mongoose.model('Exercise',exerciseSchema);
module.exports = Exercise;