import express from 'express'
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from '../controller/userController.js'

const userRouter = express.Router()
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

export default userRouter
