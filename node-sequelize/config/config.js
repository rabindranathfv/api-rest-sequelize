'use stric';

const path = require('path');
const dotenv = require('dotenv');


const loadConfig = () => {
    console.log('load node process env', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
        dotenv.config({ path: path.join(__dirname, './.env') });
        process.env.URLDB = process.env.MONGO_URI ? process.env.MONGO_URI : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    } else if (process.env.NODE_ENV === 'staging') {
        dotenv.config({ path: path.join(__dirname, './.env.staging') });
        // ###########  BD Config
        process.env.URLDB = process.env.MONGO_URI ? process.env.MONGO_URI : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    } else {
        console.log('running production');
        dotenv.config({ path: path.join(__dirname, './.env.prod') });
        process.env.URLDB = process.env.MONGO_URI ? process.env.MONGO_URI : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    }
}

module.exports = {
    loadConfig
}