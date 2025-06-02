const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generateSign } = require('../config/jwt')
const cloudinary = require('cloudinary').v2

const getPublicId = (url) => {
  const segments = url.split('/')
  const fileName = segments[segments.length - 1]
  return fileName.split('.')[0]
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
const registerUser = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body
    const profilePicture = req.file ? req.file.path : null

    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' })
    }

    const duplicateUser = await User.findOne({ userName })

    if (duplicateUser) {
      return res.status(400).json({ message: 'This UserName is not available' })
    }

    const duplicateEmail = await User.findOne({ email })
    if (duplicateEmail) {
      return res
        .status(400)
        .json({ message: 'This Email is already registered' })
    }

    const newUser = new User({
      userName,
      email,
      password,
      profilePicture,
      role: 'user'
    })

    let userSaved
    try {
      userSaved = await newUser.save()
    } catch (saveError) {
      console.error('Save error:', saveError)
      return res.status(500).json({ message: 'Failed to save user' })
    }

    const token = generateSign(userSaved._id)

    return res.status(201).json({
      message: 'Registration successful',
      user: {
        id: userSaved._id,
        userName: userSaved.userName,
        profilePicture: userSaved.profilePicture,
        role: userSaved.role
      },
      token
    })
  } catch (error) {
    console.error('Register Error:', error)
    return next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    if (
      req.user._id.toString() !== req.params.id &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para actualizar este usuario' })
    }

    const { userName, email, role } = req.body
    const profilePicture = req.file ? req.file.path : null

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found or invalid' })
    }

    if (userName && userName !== user.userName) {
      const duplicateUser = await User.findOne({ userName })
      if (duplicateUser) {
        return res
          .status(400)
          .json({ message: 'This UserName is not available' })
      }
    }

    if (email && email !== user.email) {
      const duplicateEmail = await User.findOne({ email })
      if (duplicateEmail) {
        return res
          .status(400)
          .json({ message: 'This Email is already registered' })
      }
    }

    if (profilePicture && user.profilePicture) {
      const publicId = getPublicId(user.profilePicture)
      await cloudinary.uploader.destroy(publicId)
    }

    user.userName = userName || user.userName
    user.email = email || user.email
    if (profilePicture) {
      user.profilePicture = profilePicture
    }
    if (role && ['user', 'admin'].includes(role)) {
      user.role = role
    }

    const updatedUser = await user.save()

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Update Error:', error)
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Email or password incorrect' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email or password incorrect' })
    }

    const token = generateSign(user._id)
    console.log('USER BACKEND:', user)

    return res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, email: user.email, role: user.role },
      token
    })
  } catch (error) {
    console.error('Register Error:', error)
    return res
      .status(500)
      .json({ message: 'An unexpected error occurred', error: error.message })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    // Solo el propio usuario o un admin puede borrar
    if (
      req.user._id.toString() !== req.params.id &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para borrar este usuario' })
    }

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.profilePicture) {
      const publicId = getPublicId(user.profilePicture)
      await cloudinary.uploader.destroy(publicId)
    }

    await User.findByIdAndDelete(req.params.id)

    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete Error:', error)
    next(error)
  }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
}
