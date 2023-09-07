import express from 'express'
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from '../controller/userController.js'

const router = express.Router()

// router.param('id', checkId)

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

export default router
