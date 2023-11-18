"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ciudadSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    departamento: { type: String, required: true },
    pais: { type: String, required: true },
});
const asistenteSchema = new mongoose_1.Schema({
    idAsistente: { type: String, required: true },
    usuario: { type: String, required: true },
    nombreCompleto: { type: String, required: true },
    relacionInstitucion: { type: String, required: true },
    email: { type: String, required: true },
    ciudad: { type: ciudadSchema, required: true },
});
const eventoSchema = new mongoose_1.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, required: true },
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
    facultadOrganizadora: { type: Object, required: true },
    asistentes: { type: [asistenteSchema], required: false },
});
const Evento = (0, mongoose_1.model)('Evento', eventoSchema);
exports.default = Evento;
//# sourceMappingURL=events.js.map