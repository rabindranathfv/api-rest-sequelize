'use strict';

const { loadConfig } = require('../config/config');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

loadConfig();

console.log('DB CONFIG::', process.env.DATABASE_URL);
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSW,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DIALECT
        }
    );
} else {
    console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSW);
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSW,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DIALECT
        }
    );
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;