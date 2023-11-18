"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Empleados = connection_1.default.define('empleados', {
    identificacion: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING,
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    timestamps: false,
});
exports.default = Empleados;
//# sourceMappingURL=empleados.js.map