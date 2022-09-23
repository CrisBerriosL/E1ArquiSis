require('dotenv').config();

const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            }
        );
    }).catch(err => {
        console.log('Unable to connect to the database:', err);
    });