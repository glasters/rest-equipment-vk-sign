const express = require("express");
const pool = require("../models/database");
const router = express.Router();

// Получить по ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [equipment] = await pool.execute(
      `
            SELECT id_zajav , ds.id_vid , ds.kolvo, vs.vnaim,vs.zenapr,vs.zenapr
            FROM DvSnar ds 
            LEFT JOIN VidSn vs  ON vs.id_vid = ds.id_vid 
            WHERE ds.id_vid = 3
        `,
      [id]
    );

    if (equipment.length === 0) {
      return res.status(404).json({ message: "Снаряжение не найдено" });
    }

    res.json(equipment[0]);
  } catch (error) {
    console.error("Ошибка получения снаряжения:", error);
    res
      .status(500)
      .json({ message: "Ошибка загрузки снаряжения: " + error.message });
  }
});

module.exports = router;
