require('dotenv').config();
const mongoose = require('mongoose').default;


const connectToDB = async () => {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        console.error('CONNECTION_STRING is missing from .env file');
        process.exit(1);
    }

    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error(error);
        process.exit(2);
    });
    db.on('connected', () => {
        console.log('Connected to DB');
    });
    db.on('disconnected', () => {
        console.log('Disconnected from DB');
    });

    return mongoose.connect(connectionString);
}

module.exports = connectToDB;