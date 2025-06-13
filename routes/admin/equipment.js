// Middleware для проверки админа
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Токен доступа отсутствует' });
    }
    //проверка и

    
};
// Изменить статус заявки
router.put('/equipment/:id/', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, admin_comment } = req.body;

        // Получаем ID статуса
        const [equipments] = await pool.execute(
            `SELECT 
                VidSn.id_vid,
                VidSn.vnaim,
                VidSn.kolich,
                VidSn.zenaz,
                VidSn.zenapr,
                VidSn.sost, FROM VidSn WHERE VidSn.id_vid = ?`,
            [status]
        );

        if (equipments.length === 0) {
            return res.status(400).json({ message: 'Неверный статус' });
        }

        const statusId = equipments[0].id_status;

        await pool.execute(
            'UPDATE requests SET id_status = ?, admin_comment = ? WHERE id_request = ?',
            [statusId, admin_comment || null, id]
        );

        res.json({ message: 'Статус заявки обновлен' });
    } catch (error) {
        console.error('Ошибка обновления статуса:', error);
        res.status(500).json({ message: 'Ошибка обновления статуса' });
    }
});