// /server/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import messageRoutes from './routes/messages.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Логирование всех запросов
app.use((req, res, next) => {
    console.log(`Запрос на: ${req.method} ${req.url}`);
    next();
});

// Подключение к базе данных MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB подключен'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Использование маршрутов
app.use('/auth', authRoutes); // Для авторизации
app.use('/users', userRoutes); // Для работы с пользователями
app.use('/messages', messageRoutes); // Для работы с сообщениями

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));