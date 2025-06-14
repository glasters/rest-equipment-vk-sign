const express = require('express');
const pool = require('../models/database');
const router = express.Router();
//получить 1 снаряжение на даты
//raznica 0 и id_status=3 или id_status=2 то цвет красный все выдано
//мб надо добавить WHERE Zajav.id_status < 4
router.get('/', async (req, res) => {
    try {
        console.log('Запрос списка снаряжения');
        
       const [equipment] = await pool.execute(`
            WITH RECURSIVE DateRange AS (
    SELECT '2025-05-26' AS Datef
    UNION ALL
    SELECT DATE_ADD(Datef, INTERVAL 1 DAY)
    FROM DateRange
    WHERE Datef < '2025-07-06'
)
SELECT 
Zajav.id_zajav, DvSnar.id_vid, Datef ,
VidSn.kolich as kol_all,Zajav.datas,Zajav.datapo,
DvSnar.kolvo as kol_z, Zajav.id_status, 
(VidSn.kolich-DvSnar.kolvo) as raznica
FROM Zajav, DateRange,DvSnar,VidSn
WHERE DateRange.Datef BETWEEN '2025-05-26' AND '2025-07-26'
AND   DateRange.Datef BETWEEN Zajav.datas AND Zajav.datapo
AND Zajav.id_zajav=DvSnar.id_zajav
AND VidSn.id_vid = DvSnar.id_vid
AND VidSn.id_vid = 1
ORDER BY Datef
        `, []);

        if (equipment.length === 0) {
            return res.status(404).json({ message: 'Снаряжение не найдено' });
        }

        res.json(equipment);

    } catch (error) {
        console.error('Ошибка получения снаряжения:', error);
        res.status(500).json({ message: 'Ошибка загрузки снаряжения: ' + error.message });
    }
});

// Получить статусы занятости с даты до даты :id/:datas/:datapo
router.get('/:id/:datas/:datapo', async (req, res) => {
    try {
        const { id } = req.params.id;
        const { datas } = req.params.datas;
        const { datapo } = req.params.datapo;
        
        const [equipment] = await pool.execute(`
            WITH RECURSIVE DateRange AS (
    SELECT ? AS Datef
    UNION ALL
    SELECT DATE_ADD(Datef, INTERVAL 1 DAY)
    FROM DateRange
    WHERE Datef < ?
)
SELECT 
Zajav.id_zajav, DvSnar.id_vid, Datef ,
VidSn.kolich as kol_all,Zajav.datas,Zajav.datapo,
DvSnar.kolvo as kol_z, Zajav.id_status, 
(VidSn.kolich-DvSnar.kolvo) as raznica
FROM Zajav, DateRange,DvSnar,VidSn
WHERE DateRange.Datef BETWEEN ? AND ?
AND   DateRange.Datef BETWEEN Zajav.datas AND Zajav.datapo
AND Zajav.id_zajav=DvSnar.id_zajav
AND VidSn.id_vid = DvSnar.id_vid
AND VidSn.id_vid = ?
ORDER BY Datef
        `, [datas,datapo,datas,datapo,id]);        

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
