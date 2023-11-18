"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const Facultades = connection_1.default.define('facultades', {
    codigo: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    ubicacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    nro_telefono: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    timestamps: false,
});
exports.default = Facultades;
//# sourceMappingURL=facultades.js.map