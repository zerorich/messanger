import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { sender, receiver, text } = req.body;
    try {
        const newMessage = new Message({ sender, receiver, text });
        await newMessage.save();
        res.status(201).json({ message: 'Сообщение отправлено' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка отправки сообщения' });
    }
});

router.get('/:user1/:user2', async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort('timestamp');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка получения сообщений' });
    }
});

export default router;