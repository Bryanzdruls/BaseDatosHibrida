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
exports.actualizarEvento = exports.eliminarEvento = exports.createEvento = exports.getEventos = exports.getEvento = void 0;
const events_1 = __importDefault(require("../models/events"));
const models_1 = require("../models");
const empleados_1 = __importDefault(require("../models/sql/empleados"));
const Sedes_1 = __importDefault(require("../models/sql/Sedes"));
const getEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const evento = yield events_1.default.findById(id);
        res.json({
            id,
            evento,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
        });
    }
});
exports.getEvento = getEvento;
const getEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventos = yield events_1.default.find();
        res.json({
            eventos,
            body: req.body,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
        });
    }
});
exports.getEventos = getEventos;
const createEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, categoria, fecha, lugar } = req.body;
    const { ciudad, asistente, sede, facultadorganizadora } = req.headers;
    const ciudadSQl = yield models_1.Ciudad.findOne({
        where: {
            codigo: ciudad,
        },
        attributes: { exclude: ['cod_departamento'] },
        include: [
            {
                model: models_1.Departamento,
                required: true,
                right: true,
                attributes: { exclude: ['cod_pais'] },
                as: 'departamento',
                include: [{
                        model: models_1.Pais,
                        required: true,
                        right: true,
                        as: 'pais',
                    }]
            },
        ],
    });
    const asistenteSql = yield empleados_1.default.findOne({
        where: { identificacion: asistente },
        include: [{
                model: models_1.Facultades,
                required: true,
                right: true,
            }, {
                model: Sedes_1.default,
                required: true,
                right: true,
            }, {
                model: models_1.Ciudad,
                required: true,
                right: true,
            }]
    });
    const sedeSql = yield Sedes_1.default.findOne({ where: { codigo: sede } });
    const facultadSql = yield models_1.Facultades.findOne({ where: { codigo: facultadorganizadora } });
    const objetoCiudadSql = ciudadSQl === null || ciudadSQl === void 0 ? void 0 : ciudadSQl.dataValues;
    const objetoAsistenteSql = asistenteSql === null || asistenteSql === void 0 ? void 0 : asistenteSql.dataValues;
    const { nombre: nombreSede } = sedeSql === null || sedeSql === void 0 ? void 0 : sedeSql.dataValues;
    const objetoFacultadSql = facultadSql === null || facultadSql === void 0 ? void 0 : facultadSql.dataValues;
    const departamentoSql = objetoCiudadSql === null || objetoCiudadSql === void 0 ? void 0 : objetoCiudadSql.departamento;
    const { pais } = departamentoSql === null || departamentoSql === void 0 ? void 0 : departamentoSql.dataValues;
    const ciudadGuardar = {
        nombre: objetoCiudadSql.nombre,
        departamento: departamentoSql === null || departamentoSql === void 0 ? void 0 : departamentoSql.dataValues.nombre,
        pais: pais === null || pais === void 0 ? void 0 : pais.dataValues.nombre,
    };
    const { identificacion, email, nombres, apellidos, tipo_empleado } = objetoAsistenteSql;
    const asistentesGuardar = {
        idAsistente: identificacion,
        usuario: email,
        nombreCompleto: `${nombres} ${apellidos}`,
        relacionInstitucion: tipo_empleado,
        email: email,
        ciudad: ciudadGuardar
    };
    const eventoGuardar = {
        titulo,
        descripcion,
        categoria,
        fecha: new Date(fecha),
        lugar: lugar + "-" + nombreSede,
        facultadOrganizadora: objetoFacultadSql,
        asistentes: asistentesGuardar,
    };
    const evento = new events_1.default(eventoGuardar);
    try {
        yield evento.save();
        res.json({
            resp: "Evento creado",
            evento,
            body: req.body,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
        });
    }
});
exports.createEvento = createEvento;
const eliminarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const evento = yield events_1.default.findByIdAndDelete(id);
        res.json({
            msg: 'Evento borrado correctamente',
            eventoBorrado: evento,
            body: req.body,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
        });
    }
});
exports.eliminarEvento = eliminarEvento;
const actualizarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, categoria, fecha, lugar } = req.body;
    const { ciudad, asistente, sede, facultadorganizadora } = req.headers;
    const { id } = req.params;
    const ciudadSQl = yield models_1.Ciudad.findOne({
        where: {
            codigo: ciudad,
        },
        attributes: { exclude: ['cod_departamento'] },
        include: [
            {
                model: models_1.Departamento,
                required: true,
                right: true,
                attributes: { exclude: ['cod_pais'] },
                as: 'departamento',
                include: [{
                        model: models_1.Pais,
                        required: true,
                        right: true,
                        as: 'pais',
                    }]
            },
        ],
    });
    const asistenteSql = yield empleados_1.default.findOne({
        where: { identificacion: asistente },
        include: [{
                model: models_1.Facultades,
                required: true,
                right: true,
            }, {
                model: Sedes_1.default,
                required: true,
                right: true,
            }, {
                model: models_1.Ciudad,
                required: true,
                right: true,
            }]
    });
    const sedeSql = yield Sedes_1.default.findOne({ where: { codigo: sede } });
    const facultadSql = yield models_1.Facultades.findOne({ where: { codigo: facultadorganizadora } });
    const objetoCiudadSql = ciudadSQl === null || ciudadSQl === void 0 ? void 0 : ciudadSQl.dataValues;
    const objetoAsistenteSql = asistenteSql === null || asistenteSql === void 0 ? void 0 : asistenteSql.dataValues;
    const { nombre: nombreSede } = sedeSql === null || sedeSql === void 0 ? void 0 : sedeSql.dataValues;
    const objetoFacultadSql = facultadSql === null || facultadSql === void 0 ? void 0 : facultadSql.dataValues;
    const departamentoSql = objetoCiudadSql === null || objetoCiudadSql === void 0 ? void 0 : objetoCiudadSql.departamento;
    const { pais } = departamentoSql === null || departamentoSql === void 0 ? void 0 : departamentoSql.dataValues;
    const ciudadGuardar = {
        nombre: objetoCiudadSql.nombre,
        departamento: departamentoSql === null || departamentoSql === void 0 ? void 0 : departamentoSql.dataValues.nombre,
        pais: pais === null || pais === void 0 ? void 0 : pais.dataValues.nombre,
    };
    const { identificacion, email, nombres, apellidos, tipo_empleado } = objetoAsistenteSql;
    const asistentesGuardar = {
        idAsistente: identificacion,
        usuario: email,
        nombreCompleto: `${nombres} ${apellidos}`,
        relacionInstitucion: tipo_empleado,
        email: email,
        ciudad: ciudadGuardar
    };
    const eventoGuardar = {
        titulo,
        descripcion,
        categoria,
        fecha: new Date(fecha),
        lugar: lugar + "-" + nombreSede,
        facultadOrganizadora: objetoFacultadSql,
        asistentes: asistentesGuardar,
    };
    try {
        const evento = yield events_1.default.findByIdAndUpdate(id, eventoGuardar);
        res.json({
            resp: "Evento Actualizado",
            evento,
            body: req.body,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error",
        });
    }
});
exports.actualizarEvento = actualizarEvento;
//# sourceMappingURL=eventos.js.map