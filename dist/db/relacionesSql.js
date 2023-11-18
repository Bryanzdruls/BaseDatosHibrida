"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const models_1 = require("../models");
const empleados_1 = __importDefault(require("../models/sql/empleados"));
const tipoEmpleado_1 = __importDefault(require("../models/sql/tipoEmpleado"));
const tipoContratacion_1 = __importDefault(require("../models/sql/tipoContratacion"));
const Sedes_1 = __importDefault(require("../models/sql/Sedes"));
const relacionar = () => __awaiter(void 0, void 0, void 0, function* () {
    //Relaciones
    models_1.Departamento.belongsTo(models_1.Pais, {
        as: 'pais',
        foreignKey: "cod_pais"
    });
    models_1.Ciudad.belongsTo(models_1.Departamento, {
        as: 'departamento',
        foreignKey: 'cod_departamento'
    });
    Sedes_1.default.belongsTo(models_1.Ciudad, {
        foreignKey: 'cod_ciudad'
    });
    models_1.Programas.belongsTo(models_1.Areas, {
        foreignKey: 'areas_codigo'
    });
    models_1.Areas.belongsTo(models_1.Facultades, {
        foreignKey: 'facultades_codigo'
    });
    //facu
    empleados_1.default.belongsTo(models_1.Facultades, {
        foreignKey: 'cod_facultad'
    });
    //tipos
    empleados_1.default.belongsTo(tipoEmpleado_1.default, {
        foreignKey: 'tipo_empleado'
    });
    empleados_1.default.belongsTo(tipoContratacion_1.default, {
        foreignKey: 'tipo_contratacion'
    });
    //sede
    empleados_1.default.belongsTo(Sedes_1.default, {
        foreignKey: 'codigo_sede'
    });
    //lugarnac
    empleados_1.default.belongsTo(models_1.Ciudad, {
        foreignKey: 'lugar_nacimiento'
    });
    //PELIGROOOOOOOOO
    try {
        connection_1.default.sync({ alter: true }).then(() => {
            console.log('Sincronizado');
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = relacionar;
//# sourceMappingURL=relacionesSql.js.map