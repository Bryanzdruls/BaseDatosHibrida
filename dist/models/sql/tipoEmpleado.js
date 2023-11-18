"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../db/connection"));
const tiposEmpleado = connection_1.default.define('tipos_empleado', {
    nombre: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'tipos_empleado',
    timestamps: false,
});
exports.default = tiposEmpleado;
//# sourceMappingURL=tipoEmpleado.js.map