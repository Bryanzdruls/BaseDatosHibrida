"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventos_1 = require("../controller/eventos");
const router = (0, express_1.Router)();
//eventos: '/api/eventos'
router.get('/', eventos_1.getEventos);
router.get('/:id', eventos_1.getEvento);
router.post('/', eventos_1.createEvento);
router.put('/:id', eventos_1.actualizarEvento);
router.delete('/id');
exports.default = router;
//# sourceMappingURL=eventos.js.map