import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Register a new client
 * @param {Object} clienteData - Client data
 * @returns {Promise} API response
 */
export const registrarCliente = async (clienteData) => {
  try {
    const response = await apiClient.post('/api/clientes', clienteData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw {
        status: error.response.status,
        message: error.response.data.message || 'Error al registrar el cliente',
        error: error.response.data.error || 'Error desconocido'
      };
    } else if (error.request) {
      // Request made but no response
      throw {
        status: 0,
        message: 'No se pudo conectar con el servidor',
        error: 'Network Error'
      };
    } else {
      // Something else happened
      throw {
        status: 0,
        message: 'Error inesperado',
        error: error.message
      };
    }
  }
};

/**
 * Get all clients
 * @returns {Promise} API response
 */
export const obtenerTodosLosClientes = async () => {
  try {
    const response = await apiClient.get('/api/clientes');
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 0,
      message: error.response?.data?.message || 'Error al obtener los clientes',
      error: error.response?.data?.error || 'Error desconocido'
    };
  }
};

/**
 * Get a client by ID
 * @param {number} id - Client ID
 * @returns {Promise} API response
 */
export const obtenerClientePorId = async (id) => {
  try {
    const response = await apiClient.get(`/api/clientes/${id}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 0,
      message: error.response?.data?.message || 'Error al obtener el cliente',
      error: error.response?.data?.error || 'Error desconocido'
    };
  }
};

export default apiClient;

