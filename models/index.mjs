import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import itemModel from './item.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
