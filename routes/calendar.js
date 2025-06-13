const express = require('express');
const pool = require('../models/database');
const router = express.Router();


// Получить статусы занятости с даты до даты
router.get('/:id/:datas/:datapo', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [equipment] = await pool.execute(`
            SELECT 
                VidSn.id_vid,
                
            FROM DvSnar 
            LEFT JOIN VidSn ON VidSn.id_vid = DvSnar.id_vid
            LEFT JOIN Zajav ON Zajav.id_zajav=DvSnar.id_zajav 
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
