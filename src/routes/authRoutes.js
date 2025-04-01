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
usersRouter.put('/role/:id', [isAdmin], updateUserRole)
usersRouter.post('/register', upload.single('profilePicture'), registerUser)
usersRouter.post('/login', loginUser)
usersRouter.put(
  '/update',
  [isAuth, upload.single('profilePicture')],
  updateUser
)

module.exports = usersRouter
