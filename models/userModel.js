import mongoose from 'mongoose'
import validator from 'validator'

const userSchame = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    unique: true,
    trim: true,
    minLength: [8, 'Password must more or equal than 8'],
    maxLength: [20, 'Password must less or equal than 20'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
})

const User = new mongoose.model('User', userSchame)
export default User
