"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Areas = connection_1.default.define('areas', {
    codigo: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_coordinador: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    timestamps: false,
});
exports.default = Areas;
//# sourceMappingURL=areas.js.map