import db from '../config.js';

export const createSession = async (req, res) => {
    const { title, date, formateur_id } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO sessions (title, date, formateur_id) VALUES (?, ?, ?)',
            [title, date, formateur_id]
        );
        res.status(201).json({ id: result.insertId, title, date, formateur_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllSessions = async (req, res) => {
    try {
        const [sessions] = await db.execute('SELECT * FROM sessions');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSession = async (req, res) => {
    const { id } = req.params;
    const { title, date } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE sessions SET title = ?, date = ? WHERE id = ?',
            [title, date, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Session non trouvée' });
        }
        res.status(200).json({ message: 'Session mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSession = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM sessions WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Session non trouvée' });
        }
        res.status(200).json({ message: 'Session supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

