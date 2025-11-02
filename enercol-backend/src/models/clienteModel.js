/**
 * Cliente Model - Mock data storage
 * In production, this would connect to DynamoDB or PostgreSQL
 */

let clientes = [];
let nextId = 1;

/**
 * Store a new client
 * @param {Object} clienteData - Client data to store
 * @returns {Object} Created client with ID
 */
export const createCliente = (clienteData) => {
  const nuevoCliente = {
    id: nextId++,
    ...clienteData,
    fechaRegistro: new Date().toISOString()
  };
  clientes.push(nuevoCliente);
  return nuevoCliente;
};

/**
 * Find a client by NIT
 * @param {string} nit - Client NIT
 * @returns {Object|null} Client if found, null otherwise
 */
export const findClienteByNIT = (nit) => {
  return clientes.find(cliente => cliente.nit === nit) || null;
};

/**
 * Find a client by ID
 * @param {number} id - Client ID
 * @returns {Object|null} Client if found, null otherwise
 */
export const findClienteById = (id) => {
  return clientes.find(cliente => cliente.id === id) || null;
};

/**
 * Get all clients (for testing purposes)
 * @returns {Array} All clients
 */
export const getAllClientes = () => {
  return clientes;
};

/**
 * Clear all clients (for testing purposes)
 */
export const clearClientes = () => {
  clientes = [];
  nextId = 1;
};

/**
 * Delete a client by ID
 * @param {number} id - Client ID
 * @returns {boolean} True if deleted, false if not found
 */
export const deleteClienteById = (id) => {
  const index = clientes.findIndex(cliente => cliente.id === id);
  if (index !== -1) {
    clientes.splice(index, 1);
    return true;
  }
  return false;
};

export default {
  createCliente,
  findClienteByNIT,
  findClienteById,
  getAllClientes,
  clearClientes,
  deleteClienteById
};

