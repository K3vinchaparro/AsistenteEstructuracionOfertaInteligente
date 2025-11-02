# EnerCol Backend API

Backend REST API for EnerCol client registration system.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000`

## 📚 API Endpoints

### Health Check
```
GET /health
```

### Client Registration
```
POST /api/clientes
Content-Type: application/json

{
  "razonSocial": "Empresa de Energía S.A.",
  "nit": "900123456-1",
  "sectorEconomico": "Industrial",
  "modalidadContratual": "Mercado Regulado",
  "nombreContacto": "Juan Pérez",
  "correoContacto": "juan.perez@empresa.com",
  "telefonoContacto": "+57 300 123 4567",
  "rutaArchivoConsumo": "/uploads/consumo_hist_900123456.xlsx"
}
```

**Response (201 Created):**
```json
{
  "message": "Cliente registrado exitosamente",
  "cliente": {
    "id": 1,
    "razonSocial": "Empresa de Energía S.A.",
    "nit": "900123456-1",
    "sectorEconomico": "Industrial",
    "modalidadContratual": "Mercado Regulado",
    "nombreContacto": "Juan Pérez",
    "correoContacto": "juan.perez@empresa.com",
    "telefonoContacto": "+57 300 123 4567",
    "rutaArchivoConsumo": "/uploads/consumo_hist_900123456.xlsx",
    "fechaRegistro": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get All Clients
```
GET /api/clientes
```

### Get Client by ID
```
GET /api/clientes/:id
```

## 🔧 Error Responses

### 400 Bad Request
```json
{
  "error": "Campos requeridos faltantes",
  "message": "Todos los campos obligatorios deben estar presentes"
}
```

### 409 Conflict (NIT duplicate)
```json
{
  "error": "NIT duplicado",
  "message": "Ya existe un cliente registrado con el NIT: 900123456-1"
}
```

### 500 Internal Server Error
```json
{
  "error": "Error en el servidor",
  "message": "Error interno del servidor"
}
```

## 🧪 Testing

```bash
npm test
```

## 📁 Project Structure

```
enercol-backend/
├── src/
│   ├── controllers/
│   │   └── clienteController.js    # Business logic
│   ├── models/
│   │   └── clienteModel.js         # Data layer
│   ├── routes/
│   │   └── clienteRoutes.js        # Route definitions
│   ├── middleware/
│   │   └── errorHandler.js         # Error handling
│   └── app.js                       # Application entry point
├── .env                             # Environment variables
├── package.json                     # Dependencies
└── README.md                        # Documentation
```

## 🔐 Environment Variables

```env
PORT=4000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

## 📝 Ticket Reference

- **DEV-BACK-001**: Implementar servicio REST para registro de clientes

## 🛠️ Technology Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration
- **Jest**: Testing framework

## 📄 License

ISC

