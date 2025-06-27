import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,

    }, 
    email: {
        type: String,
        required: [true, 'Email is required'], 
        unique: true,
    }, 
    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean, // by default is not verified till they verify email
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifiedToken: String,
    verifiedTokenExpiry: Date


});

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;