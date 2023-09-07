export const checkId = (req, res, next, val) => {
  if (val * 1 >= 100) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID',
    })
  }
  next()
}

export const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'filed',
    message: 'This api is not defined.'
  })
}
export const createUser = getAllUsers
export const getUser = getAllUsers
export const updateUser = getAllUsers
export const deleteUser = getAllUsers
