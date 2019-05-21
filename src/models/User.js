const mongoose = require('mongoose');
const Exercise = require('./Exercise.js')
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
})

userSchema.virtual('exercises',{
  ref: 'Exercise',
  localField: "_id",
  foreignField: 'userId'
})

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = this.toObject();
  delete userObject.__v;
  return userObject;
}

const User = mongoose.model('User',userSchema);

module.exports = User;