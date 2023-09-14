import express from 'express'
import { signup } from '../controller/authcontroller.js'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controller/userController.js'

const router = express.Router()
// router.param('id', checkId)
router.post('/signup', signup)

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
