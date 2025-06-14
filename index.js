const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config(); // Упрощенная загрузка

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Подключение к БД
require('./models/database');

// Базовый роут
app.get('/', (req, res) => {
  res.json({ 
    message: 'VK Equipment API работает',
    status: 'OK',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Тестовый маршрут
app.get('/test', (req, res) => {
  res.json({ message: 'Сервер работает!' });
});

// API Маршруты
app.use('/equipment', require('./routes/equipment'));
app.use('/types', require('./routes/types'));
app.use('/calendar', require('./routes/calendar'));
//app.use('/types', require('./routes/admin/equipment'));

// Обработка несуществующих маршрутов
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Маршрут не найден',
    path: req.originalUrl,
    method: req.method
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
