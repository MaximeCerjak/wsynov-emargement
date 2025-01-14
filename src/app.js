import express from 'express';
import db from './config.js';
import userAuthRoutes from './routes/userAuthRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import emargementRoutes from './routes/emargementRoutes.js';

const app = express();

app.use(express.json());

(async () => {
    try {
        db.query('SELECT 1');
        console.log('Connexion à la base de données réussie !');
    } catch (error) {
        console.error('Erreur de connexion à la base de données :', error);
        process.exit(1); 
    }
})();

app.use('/auth', userAuthRoutes); 
app.use('/sessions', sessionRoutes); 
app.use('/emargements', emargementRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
