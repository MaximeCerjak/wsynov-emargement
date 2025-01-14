import db from '../config.js';

export const addEmargement = async (req, res) => {
    const { session_id, etudiant_id, status } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO emargements (session_id, etudiant_id, status) VALUES (?, ?, ?)',
            [session_id, etudiant_id, status]
        );
        res.status(201).json({ id: result.insertId, session_id, etudiant_id, status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmargementsBySession = async (req, res) => {
    const { session_id } = req.params;

    try {
        const [emargements] = await db.execute(
            'SELECT * FROM emargements WHERE session_id = ?',
            [session_id]
        );
        res.status(200).json(emargements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
