const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
