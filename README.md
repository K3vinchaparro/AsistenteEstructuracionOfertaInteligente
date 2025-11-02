# EnerCol - Sistema de Gestión Energética

Proyecto completo con Backend y Frontend para el registro de clientes del sistema EnerCol.

## 📋 Descripción

Este workspace contiene dos proyectos integrados:

1. **enercol-backend**: API REST construida con Node.js y Express
2. **enercol-frontend**: Aplicación web construida con React, Vite y Tailwind CSS

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.x
- npm o yarn

### Instalación y Ejecución

#### 1. Configurar el Backend

```bash
# Navegar al directorio del backend
cd enercol-backend

# Instalar dependencias
npm install

# Iniciar el servidor en modo desarrollo
npm run dev
```

El backend estará disponible en `http://localhost:4000`

#### 2. Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd enercol-frontend

# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Verificar la Instalación

1. Backend: Visite `http://localhost:4000/health` para verificar que el API está funcionando
2. Frontend: Abra `http://localhost:5173` en su navegador

## 📁 Estructura del Proyecto

```
enercol-workspace/
├── enercol-backend/          # API REST backend
│   ├── src/
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── models/           # Capa de datos
│   │   ├── routes/           # Definición de rutas
│   │   ├── middleware/       # Middleware personalizado
│   │   └── app.js            # Punto de entrada
│   ├── tests/                # Pruebas unitarias
│   ├── package.json
│   └── README.md
├── enercol-frontend/         # Aplicación web frontend
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/            # Páginas
│   │   ├── services/         # Cliente API
│   │   ├── App.jsx           # Componente principal
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── README.md
├── tests/                    # Pruebas de integración
├── .gitignore
└── README.md                 # Este archivo
```

## 🔧 Configuración

### Backend

Variables de entorno (`.env`):
```env
PORT=4000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend

Variables de entorno (`.env`):
```env
VITE_API_URL=http://localhost:4000
```

## 📝 Funcionalidades

### Backend (DEV-BACK-001)

- ✅ POST `/api/clientes` - Registrar nuevo cliente
- ✅ GET `/api/clientes` - Obtener todos los clientes
- ✅ GET `/api/clientes/:id` - Obtener cliente por ID
- ✅ Validación de NIT único
- ✅ Validación de campos requeridos
- ✅ Validación de formato de correo
- ✅ Manejo de errores HTTP (400, 409, 500)

### Frontend (DEV-FRONT-001)

- ✅ Formulario de registro de clientes
- ✅ Validación de campos obligatorios
- ✅ Carga de archivo de consumo histórico (CSV/XLSX)
- ✅ Validación de tamaño de archivo (max 5MB)
- ✅ Mensajes de error y confirmación
- ✅ Integración con API backend
- ✅ Diseño responsivo con Tailwind CSS

## 🧪 Testing

### Backend

```bash
cd enercol-backend
npm test
```

### Frontend

```bash
cd enercol-frontend
npm test
```

### QA Testing

Ver [QA_PLAN.md](./QA_PLAN.md) para el plan de pruebas completo.

## 📊 Endpoints de API

### POST /api/clientes

Registrar un nuevo cliente:

```json
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

**Respuesta exitosa (201):**
```json
{
  "message": "Cliente registrado exitosamente",
  "cliente": {
    "id": 1,
    "razonSocial": "Empresa de Energía S.A.",
    "nit": "900123456-1",
    ...
    "fechaRegistro": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🐛 Manejo de Errores

### 400 Bad Request
Campos faltantes o formato inválido

### 409 Conflict
NIT duplicado

### 500 Internal Server Error
Error en el servidor

## 📚 Documentación

- [Backend README](./enercol-backend/README.md)
- [Frontend README](./enercol-frontend/README.md)
- [QA Plan](./QA_PLAN.md)

## 🎫 Tickets Implementados

- **DEV-BACK-001**: Implementar servicio REST para registro de clientes
- **DEV-FRONT-001**: Desarrollar formulario de registro de clientes
- **QA-TEST-001**: Plan de pruebas del sistema de registro

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express
- CORS
- dotenv
- Jest (Testing)

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Hot Toast

## 🤝 Contribución

1. Fork el proyecto
2. Cree una rama para su feature (`git checkout -b feature/AmazingFeature`)
3. Commit sus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abra un Pull Request

## 📄 Licencia

ISC

## 👥 Equipo

EnerCol Development Team

## 📞 Contacto

Para más información, contacte al equipo de desarrollo.

