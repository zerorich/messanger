import express from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    const { username, password, phone, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Имя пользователя уже занято' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, phone, firstName, lastName });
        await newUser.save();
        res.status(201).json({ message: 'Регистрация успешна' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка регистрации' });
    }
});

// Вход (логин)
// Вход (логин)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Ищем пользователя по имени, явно запрашивая пароль
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        // Сравниваем пароль с хэшированным в базе
        console.log('Найденный пользователь:', user);
        console.log('Пароль пользователя в БД:', user ? user.password : 'Нет пароля');
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        // Если данные верны, возвращаем информацию о пользователе
        res.json({
            message: 'Успешный вход',
            user: {
                username: user.username,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка входа' });
        console.error('Ошибка на сервере:', err);
    }
});

export default router;
