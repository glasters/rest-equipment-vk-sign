// Middleware для проверки админа
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Токен доступа отсутствует' });
    }
    //проверка и выдача прав

    
};
// Изменить статус заявки
router.put('/equipment/:id/', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { equipment } = req.body;

        // Получаем ID статуса
        const [equipments] = await pool.execute(
            `SELECT 
                `,
            [equipment]
        );

        if (equipments.length === 0) {
            return res.status(400).json({ message: 'Неверный' });
        }

        const statusId = equipments[0].id_status;

        await pool.execute(
            'UPDATE  SET  WHERE ',
            [id  || null]
        );

        res.json({ message: 'обновлен' });
    } catch (error) {
        console.error('Ошибка обновления :', error);
        res.status(500).json({ message: 'Ошибка обновления ' });
    }
});