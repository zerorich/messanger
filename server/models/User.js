import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Добавили пароль
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;