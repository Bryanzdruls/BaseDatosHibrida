"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("postgres://gbdmpizs:yaEolVcU4q7zoqbGcYzuYwi37RDK86M4@flora.db.elephantsql.com/gbdmpizs");
exports.default = db;
/*const db = new Sequelize('finalBD2','postgres', 'yaEolVcU4q7zoqbGcYzuYwi37RDK86M4', {
    host: 'localhost',
    dialect: 'postgres',
    logging:false,
});*/ 
//# sourceMappingURL=connection.js.map