import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Получение данных о пользователе по username
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json({
            username: user.username,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
        });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка получения данных о пользователе' });
    }
});
// Получить всех пользователей (имя, фамилия, юзернейм)
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, 'firstName lastName username');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении пользователей' });
    }
});

// Добавить новый маршрут для получения всех чатов
// Пример для получения чатов пользователей (если есть такая логика на сервере)
// router.get('/chats', async (req, res) => {
//     try {
//         const chats = await Chat.find({}); // Допустим, Chat - это модель для чатов
//         res.json(chats);
//     } catch (err) {
//         res.status(500).json({ error: 'Не удалось получить чаты' });
//     }
// });

// Обновление данных пользователя
router.put('/:username', async (req, res) => {
    const { username } = req.params;
    const { phone, firstName, lastName } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        user.phone = phone || user.phone;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;

        await user.save();
        res.json({ message: 'Данные пользователя успешно обновлены' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка обновления данных' });
    }
});

// Удаление пользователя
router.delete('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOneAndDelete({ username });
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json({ message: 'Пользователь успешно удален' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка удаления пользователя' });
    }
});

export default router;
