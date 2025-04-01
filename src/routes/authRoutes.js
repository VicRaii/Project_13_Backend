const {
  getUsers,
  updateUserRole,
  registerUser,
  loginUser,
  updateUser
} = require('../controllers/authController')
const { isAdmin, isAuth } = require('../middleware/auth')
const upload = require('../middleware/upload')

const usersRouter = require('express').Router()

usersRouter.get('/', getUsers)
usersRouter.post(
  '/register',
  [upload('UserProfilePictures').single('image')],
  registerUser
)
usersRouter.post('/login', loginUser)
usersRouter.put('/role/:id', [isAdmin], updateUserRole)
usersRouter.put(
  '/update',
  [isAuth, upload('UserProfilePictures').single('image')],
  updateUser
)

module.exports = usersRouter
