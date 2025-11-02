import app from '../../src/app.js';
import request from 'supertest';
import { clearClientes } from '../../src/models/clienteModel.js';

describe('Cliente API Tests', () => {
  beforeEach(() => {
    clearClientes();
  });

  describe('POST /api/clientes', () => {
    it('should register a new client successfully', async () => {
      const clientData = {
        razonSocial: 'Empresa de Energía S.A.',
        nit: '900123456-1',
        sectorEconomico: 'Industrial',
        modalidadContratual: 'Mercado Regulado',
        nombreContacto: 'Juan Pérez',
        correoContacto: 'juan.perez@empresa.com',
        telefonoContacto: '+57 300 123 4567',
        rutaArchivoConsumo: '/uploads/consumo_hist_900123456.xlsx'
      };

      const response = await request(app)
        .post('/api/clientes')
        .send(clientData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Cliente registrado exitosamente');
      expect(response.body.cliente).toHaveProperty('id');
      expect(response.body.cliente.nit).toBe(clientData.nit);
      expect(response.body.cliente.fechaRegistro).toBeDefined();
    });

    it('should return 409 when NIT already exists', async () => {
      const clientData = {
        razonSocial: 'Empresa A',
        nit: '900123456-1',
        sectorEconomico: 'Industrial',
        modalidadContratual: 'Mercado Regulado',
        nombreContacto: 'Juan Pérez',
        correoContacto: 'juan@empresa.com',
        telefonoContacto: '+57 300 123 4567'
      };

      // Register first client
      await request(app)
        .post('/api/clientes')
        .send(clientData)
        .expect(201);

      // Try to register duplicate NIT
      const response = await request(app)
        .post('/api/clientes')
        .send({ ...clientData, razonSocial: 'Empresa B' })
        .expect(409);

      expect(response.body.error).toBe('NIT duplicado');
    });

    it('should return 400 when required fields are missing', async () => {
      const incompleteData = {
        razonSocial: 'Empresa de Energía S.A.',
        nit: '900123456-1'
        // Missing other required fields
      };

      const response = await request(app)
        .post('/api/clientes')
        .send(incompleteData)
        .expect(400);

      expect(response.body.error).toBe('Campos requeridos faltantes');
    });

    it('should return 400 when email format is invalid', async () => {
      const clientData = {
        razonSocial: 'Empresa de Energía S.A.',
        nit: '900123456-1',
        sectorEconomico: 'Industrial',
        modalidadContratual: 'Mercado Regulado',
        nombreContacto: 'Juan Pérez',
        correoContacto: 'invalid-email',
        telefonoContacto: '+57 300 123 4567'
      };

      const response = await request(app)
        .post('/api/clientes')
        .send(clientData)
        .expect(400);

      expect(response.body.error).toBe('Formato de correo inválido');
    });
  });

  describe('GET /api/clientes', () => {
    it('should return all clients', async () => {
      const clientData = {
        razonSocial: 'Empresa de Energía S.A.',
        nit: '900123456-1',
        sectorEconomico: 'Industrial',
        modalidadContratual: 'Mercado Regulado',
        nombreContacto: 'Juan Pérez',
        correoContacto: 'juan.perez@empresa.com',
        telefonoContacto: '+57 300 123 4567'
      };

      await request(app)
        .post('/api/clientes')
        .send(clientData)
        .expect(201);

      const response = await request(app)
        .get('/api/clientes')
        .expect(200);

      expect(response.body.total).toBe(1);
      expect(response.body.clientes).toHaveLength(1);
    });

    it('should return empty array when no clients exist', async () => {
      const response = await request(app)
        .get('/api/clientes')
        .expect(200);

      expect(response.body.total).toBe(0);
      expect(response.body.clientes).toHaveLength(0);
    });
  });

  describe('GET /api/clientes/:id', () => {
    it('should return a specific client by ID', async () => {
      const clientData = {
        razonSocial: 'Empresa de Energía S.A.',
        nit: '900123456-1',
        sectorEconomico: 'Industrial',
        modalidadContratual: 'Mercado Regulado',
        nombreContacto: 'Juan Pérez',
        correoContacto: 'juan.perez@empresa.com',
        telefonoContacto: '+57 300 123 4567'
      };

      const createResponse = await request(app)
        .post('/api/clientes')
        .send(clientData)
        .expect(201);

      const clientId = createResponse.body.cliente.id;

      const response = await request(app)
        .get(`/api/clientes/${clientId}`)
        .expect(200);

      expect(response.body.nit).toBe(clientData.nit);
    });

    it('should return 404 when client does not exist', async () => {
      const response = await request(app)
        .get('/api/clientes/999')
        .expect(404);

      expect(response.body.error).toBe('Cliente no encontrado');
    });
  });
});

