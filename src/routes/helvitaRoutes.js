import { Router } from 'express';
import * as controller from '../controllers/helvitaController.js';

const router = Router();

// run GET query in Postman on route 'http://localhost:3000'
router.get('/', controller.getLocal);

// run GET query in Postman on route 'http://localhost:3000/life'
router.get('/life', controller.getLife);

// список усіх станів ('http://localhost:3000/helvita/states')
router.get('/helvita/states', controller.getStates);

// конкретний стан за id ('http://localhost:3000/helvita/states/1')
router.get('/helvita/states/:helvitaID', controller.getStateByID);

// запит, що викликає помилку
router.get('/maybe-error', controller.getError);

export default router;
