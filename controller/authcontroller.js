import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      user,
    }
  })
})

export const login = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(200).json({
    status: 'success',
    data: {
      user,
    }
  })
})
