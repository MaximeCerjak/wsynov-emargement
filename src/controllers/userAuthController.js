import db from '../config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        console.log('Connexion à la base de données en cours...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Testez une requête simple
        const [result] = await db.execute(
            'INSERT INTO utilisateurs (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        console.log('Résultat de la requête :', result);

        res.status(201).json({ id: result.insertId, name, email, role });
    } catch (error) {
        console.error('Erreur dans signup :', error.message);
        res.status(500).json({ error: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log('Connexion à la base de données en cours...');

    try {
        const [users] = await db.execute('SELECT * FROM utilisateurs WHERE email = ?', [email]);
        console.log(users);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erreur dans login :', error.message);
        res.status(500).json({ error: error.message });
    }
};
