import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, minlength: 3 },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        birthday: { type: Date },
        favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    },
    { timestamps: true }
)

userSchema.pre('save', async function hashPassword(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = function comparePassword(candidate) {
    return bcrypt.compare(candidate, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
