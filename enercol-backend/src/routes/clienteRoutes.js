import express from 'express';
import {
  registrarCliente,
  obtenerClientePorId,
  obtenerTodosLosClientes
} from '../controllers/clienteController.js';

const router = express.Router();

// POST /api/clientes - Register a new client
router.post('/', registrarCliente);

// GET /api/clientes/:id - Get a specific client
router.get('/:id', obtenerClientePorId);

// GET /api/clientes - Get all clients
router.get('/', obtenerTodosLosClientes);

export default router;

