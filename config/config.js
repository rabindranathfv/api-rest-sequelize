'use stric';

const path = require('path');
const dotenv = require('dotenv');


const loadConfig = () => {
    if (process.env.NODE_ENV === 'production') {
        console.log('running production');
        dotenv.config({ path: path.join(__dirname, './.env.prod') });
        process.env.DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    } else if (process.env.NODE_ENV === 'staging') {
        dotenv.config({ path: path.join(__dirname, './.env.staging') });
        // ###########  BD Config
        process.env.URL_DB_PG = process.env.URL_DB_PG ? process.env.URL_DB_PG: `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    } else {
        console.log('running development');
        dotenv.config({ path: path.join(__dirname, './.env') });
        process.env.URL_DB_PG = process.env.URL_DB_PG ? process.env.URL_DB_PG: `${process.env.DB_DIALECT}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    }
}

module.exports = {
    loadConfig
}