const express = require('express');
const pool = require('../models/database');
const router = express.Router();

// Получить все снаряжение
router.get('/', async (req, res) => {
    try {
        console.log('Запрос списка снаряжения');
        
        const [equipment] = await pool.execute(`
            SELECT 
                VidSn.id_vid,
                TipSn.tnaim,
                VidSn.vnaim,
                VidSn.kolich,
                VidSn.zenaz,
                VidSn.zenapr,
                VidSn.sost
            FROM VidSn
            LEFT JOIN TipSn ON VidSn.id_tip=TipSn.id_tip
        `);

        console.log(`Найдено ${equipment.length} единиц снаряжения`);
        res.json(equipment);

    } catch (error) {
        console.error('Ошибка получения снаряжения:', error);
        res.status(500).json({ message: 'Ошибка загрузки снаряжения: ' + error.message });
    }
});

// Получить снаряжение по ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [equipment] = await pool.execute(`
            SELECT 
                VidSn.id_vid,
                VidSn.vnaim,
                VidSn.kolich,
                VidSn.zenaz,
                VidSn.zenapr,
                VidSn.sost
            FROM VidSn 
            WHERE VidSn.id_vid = ?
        `, [id]);

        if (equipment.length === 0) {
            return res.status(404).json({ message: 'Снаряжение не найдено' });
        }

        res.json(equipment[0]);

    } catch (error) {
        console.error('Ошибка получения снаряжения:', error);
        res.status(500).json({ message: 'Ошибка загрузки снаряжения: ' + error.message });
    }
});

module.exports = router;
