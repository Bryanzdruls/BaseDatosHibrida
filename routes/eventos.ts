import {Router} from 'express';
import { actualizarEvento, createEvento,  eliminarEvento,  getEvento, getEventos } from '../controller/eventos';

const router = Router();
//eventos: '/api/eventos' 


router.get('/',getEventos);
router.get('/:id',getEvento);
router.post('/', createEvento);
router.put('/:id',actualizarEvento);
router.delete('/:id',eliminarEvento);



export default router;