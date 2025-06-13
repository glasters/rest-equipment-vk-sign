// Middleware для проверки админа
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Токен доступа отсутствует' });
    }
    //проверка и выдача прав добавление в бд с vk id и ролью из группы вк...

    
};
// Изменить статус заявки
router.put('/equipment/:id/', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { equipment } = req.body;


        const id_vid = equipments[0].id_vid;
        const id_tip = equipments[0].id_tip;
        const vnaim = equipments[0].vnaim;
        const kolich = equipments[0].kolich;
        const zenaz = equipments[0].zenaz;
        const zenapr = equipments[0].zenapr;
        const sost = equipments[0].sost;

        await pool.execute(
            `UPDATE VidSn SET
            VidSn,id_tip = ?,
            VidSn.vnaim = ?,
            VidSn.kolich = ?,
            VidSn.zenaz = ?,
            VidSn.zenapr = ?,
            VidSn.sost = ?,
            WHERE VidSn.id_vid=?`,
            [id_tip,vnaim,kolich,zenaz,zenapr,sost,id_vid  || null,null,null,null,null,null,null]
        );

        res.json({ message: 'обновлен' });
    } catch (error) {
        console.error('Ошибка обновления :', error);
        res.status(500).json({ message: 'Ошибка обновления ' });
    }
});