import knex from 'knex';
import db_config from './db-config';

const db = knex(db_config[process.env.NODE_ENV || 'development'])

export default db;
