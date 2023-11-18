"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const tiposContratacion = connection_1.default.define('tipos_contratacion', {
    nombre: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'tipos_contratacion',
    timestamps: false,
});
exports.default = tiposContratacion;
//# sourceMappingURL=tipoContratacion.js.map