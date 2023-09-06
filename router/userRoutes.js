import express from 'express'
import {checkBody, checkId, createUser, deleteUser, getAllUsers, getUser, updateUser} from '../controller/userController.js'

const router = express.Router()

router.param('id', checkId)

router
  .route('/')
  .get(getAllUsers)
  .post(checkBody, createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

export default router
