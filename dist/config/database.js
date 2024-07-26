"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class DatabaseConfig {
    constructor() {
        this.db = process.env.DB_NAME || "postgres";
        this.user = process.env.DB_USER || "postgres";
        this.password = process.env.DB_PASSWORD || '001479';
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
        this.maxPool = process.env.MAX_POOL ? parseInt(process.env.MAX_POOL) : 10;
        this.minPool = process.env.MIN_POOL ? parseInt(process.env.MIN_POOL) : 0;
        this.dbDialect = process.env.DB_DIALECT || "postgres";
        this.database = new sequelize_1.Sequelize(this.db, this.user, this.password, {
            host: this.host,
            port: this.port,
            dialect: this.dbDialect,
            pool: {
                max: this.maxPool,
                min: this.minPool,
            }
        });
        this.connect();
    }
    connect() {
        console.log('Connecting to the database...');
        this.database.authenticate()
            .then(() => {
            console.info('Connection Successfully established!');
        })
            .catch(err => {
            console.error('Unable to connect to databaseee:', err);
        });
        this.database.sync({
            force: true
        }).then(() => {
            console.log('Database and tables created!');
        }).catch(err => {
            console.error('Error creating tables:', err);
        });
    }
    initDb() {
        return new sequelize_1.Sequelize(`postgres://${this.user}:${this.password}@localhost:${this.port}/${this.db}`);
    }
    get getDatabase() {
        return this.database;
    }
}
exports.default = DatabaseConfig;
