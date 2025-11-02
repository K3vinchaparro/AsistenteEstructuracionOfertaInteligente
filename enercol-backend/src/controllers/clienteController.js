import { createCliente, findClienteByNIT, findClienteById, getAllClientes } from '../models/clienteModel.js';

/**
 * POST /api/clientes
 * Register a new client
 * 
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Register a new client
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razonSocial
 *               - nit
 *               - sectorEconomico
 *               - modalidadContratual
 *               - nombreContacto
 *               - correoContacto
 *               - telefonoContacto
 *             properties:
 *               razonSocial:
 *                 type: string
 *                 example: "Empresa de Energía S.A."
 *               nit:
 *                 type: string
 *                 example: "900123456-1"
 *               sectorEconomico:
 *                 type: string
 *                 example: "Industrial"
 *               modalidadContratual:
 *                 type: string
 *                 example: "Mercado Regulado"
 *               nombreContacto:
 *                 type: string
 *                 example: "Juan Pérez"
 *               correoContacto:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@empresa.com"
 *               telefonoContacto:
 *                 type: string
 *                 example: "+57 300 123 4567"
 *               rutaArchivoConsumo:
 *                 type: string
 *                 example: "/uploads/consumo_hist_900123456.xlsx"
 *     responses:
 *       201:
 *         description: Client registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: NIT already exists
 *       500:
 *         description: Internal server error
 */
export const registrarCliente = async (req, res, next) => {
  try {
    const {
      razonSocial,
      nit,
      sectorEconomico,
      modalidadContratual,
      nombreContacto,
      correoContacto,
      telefonoContacto,
      rutaArchivoConsumo
    } = req.body;

    // Check if NIT already exists
    const clienteExistente = findClienteByNIT(nit);
    if (clienteExistente) {
      return res.status(409).json({
        error: 'NIT duplicado',
        message: `Ya existe un cliente registrado con el NIT: ${nit}`
      });
    }

    // Validate required fields
    if (!razonSocial || !nit || !sectorEconomico || !modalidadContratual || 
        !nombreContacto || !correoContacto || !telefonoContacto) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        message: 'Todos los campos obligatorios deben estar presentes'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoContacto)) {
      return res.status(400).json({
        error: 'Formato de correo inválido',
        message: 'El correo electrónico debe tener un formato válido'
      });
    }

    // Create the client
    const nuevoCliente = createCliente({
      razonSocial,
      nit,
      sectorEconomico,
      modalidadContratual,
      nombreContacto,
      correoContacto,
      telefonoContacto,
      rutaArchivoConsumo: rutaArchivoConsumo || null
    });

    return res.status(201).json({
      message: 'Cliente registrado exitosamente',
      cliente: nuevoCliente
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/clientes/:id
 * Get a client by ID
 */
export const obtenerClientePorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cliente = findClienteById(parseInt(id));
    
    if (!cliente) {
      return res.status(404).json({
        error: 'Cliente no encontrado',
        message: `No existe un cliente con ID: ${id}`
      });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/clientes
 * Get all clients
 */
export const obtenerTodosLosClientes = async (req, res, next) => {
  try {
    const clientes = getAllClientes();
    return res.status(200).json({
      total: clientes.length,
      clientes
    });
  } catch (error) {
    next(error);
  }
};

