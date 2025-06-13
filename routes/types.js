const express = require('express');
const pool = require('../models/database');
const router = express.Router();


// Получить все снаряжение
router.get('/', async (req, res) => {
    try {
        const [types] = await pool.execute(`
            SELECT id_tip, tnaim
            FROM TipSn
        `);

        res.json(types);

    } catch (error) {
        console.error('Ошибка получения типов снаряжения:', error);
        res.status(500).json({ message: 'Ошибка загрузки типов снаряжения: ' + error.message });
    }
});
// Получить типы снаряжения
router.get('/', async (req, res) => {
    
});

module.exports = router;
