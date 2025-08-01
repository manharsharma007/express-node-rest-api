"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const db_config = {
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST_PRODUCTION,
            user: process.env.DB_USER_PRODUCTION,
            password: process.env.DB_PASS_PRODUCTION,
            database: process.env.DB_NAME_PRODUCTION,
        },
        pool: { min: 0, max: 10 },
    },
    testing: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST_TESTING,
            user: process.env.DB_USER_TESTING,
            password: process.env.DB_PASS_TESTING,
            database: process.env.DB_NAME_TESTING,
        },
        pool: { min: 0, max: 10 },
    },
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        debug: true,
        pool: { min: 0, max: 10 },
    }
};
exports.default = db_config;
//# sourceMappingURL=db-config.js.map