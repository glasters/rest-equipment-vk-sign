const express = require('express');
const pool = require('../models/database');
const router = express.Router();


// Получить статусы занятости с даты до даты
router.get('/:id/:datas/:datapo', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [equipment] = await pool.execute(`
            WITH RECURSIVE DateRange AS (
    SELECT '2025-05-26' AS Date
    UNION ALL
    SELECT DATE_ADD(Date, INTERVAL 1 DAY)
    FROM DateRange
    WHERE Date < '2025-07-06'
)
SELECT 
Zajav.id_zajav, DvSnar.id_vid, \`Date\`,
VidSn.kolich as kol_all,Zajav.datas,Zajav.datapo,
DvSnar.kolvo as kol_z, Zajav.id_status, 
(VidSn.kolich-DvSnar.kolvo) as raznica
FROM Zajav, DateRange,DvSnar,VidSn
WHERE DateRange.Date BETWEEN ? AND ?
AND   DateRange.Date BETWEEN Zajav.datas AND Zajav.datapo
AND Zajav.id_zajav=DvSnar.id_zajav
AND VidSn.id_vid = DvSnar.id_vid
AND VidSn.id_vid = ?
ORDER BY \`Date\` 
        `, [datas,datapo,id]);

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
