# Postman Collection - EnerCol API

## Import this collection to Postman

```json
{
  "info": {
    "name": "EnerCol API",
    "description": "API tests for EnerCol client registration",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:4000/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["health"]
        }
      }
    },
    {
      "name": "Register Client - Success",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"razonSocial\": \"Empresa de Energía S.A.\",\n  \"nit\": \"900123456-1\",\n  \"sectorEconomico\": \"Industrial\",\n  \"modalidadContratual\": \"Mercado Regulado\",\n  \"nombreContacto\": \"Juan Pérez\",\n  \"correoContacto\": \"juan.perez@empresa.com\",\n  \"telefonoContacto\": \"+57 300 123 4567\",\n  \"rutaArchivoConsumo\": \"/uploads/consumo_hist.xlsx\"\n}"
        },
        "url": {
          "raw": "http://localhost:4000/api/clientes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "clientes"]
        }
      }
    },
    {
      "name": "Register Client - Duplicate NIT",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"razonSocial\": \"Otra Empresa S.A.\",\n  \"nit\": \"900123456-1\",\n  \"sectorEconomico\": \"Comercial\",\n  \"modalidadContratual\": \"Mercado No Regulado\",\n  \"nombreContacto\": \"María García\",\n  \"correoContacto\": \"maria.garcia@otra.com\",\n  \"telefonoContacto\": \"+57 300 999 9999\"\n}"
        },
        "url": {
          "raw": "http://localhost:4000/api/clientes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "clientes"]
        }
      }
    },
    {
      "name": "Register Client - Missing Fields",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"razonSocial\": \"Test Company\",\n  \"nit\": \"123456789-1\"\n}"
        },
        "url": {
          "raw": "http://localhost:4000/api/clientes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "clientes"]
        }
      }
    },
    {
      "name": "Register Client - Invalid Email",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"razonSocial\": \"Test Company\",\n  \"nit\": \"123456789-1\",\n  \"sectorEconomico\": \"Industrial\",\n  \"modalidadContratual\": \"Mercado Regulado\",\n  \"nombreContacto\": \"Test User\",\n  \"correoContacto\": \"invalid-email\",\n  \"telefonoContacto\": \"+57 300 000 0000\"\n}"
        },
        "url": {
          "raw": "http://localhost:4000/api/clientes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "clientes"]
        }
      }
    },
    {
      "name": "Get All Clients",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:4000/api/clientes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "clientes"]
        }
      }
    },
    {
      "name": "Get Client by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:4000/api/clientes/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "clientes", "1"]
        }
      }
    },
    {
      "name": "Get Client by ID - Not Found",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:4000/api/clientes/999",
          "protocol": "http",
          "host": ["localhost"],
          "port": "4000",
          "path": ["api", "clientes", "999"]
        }
      }
    }
  ]
}
```

## How to Use

1. Open Postman
2. Click on "Import"
3. Paste the JSON above
4. Run individual requests or the entire collection

## Expected Results

### Health Check
- Status: 200 OK
- Body: `{"status": "OK", "message": "EnerCol Backend API is running"}`

### Register Client - Success
- Status: 201 Created
- Body: Client object with ID and fechaRegistro

### Register Client - Duplicate NIT
- Status: 409 Conflict
- Error message: "NIT duplicado"

### Register Client - Missing Fields
- Status: 400 Bad Request
- Error message: "Campos requeridos faltantes"

### Register Client - Invalid Email
- Status: 400 Bad Request
- Error message: "Formato de correo inválido"

### Get All Clients
- Status: 200 OK
- Body: Array of clients with total count

### Get Client by ID
- Status: 200 OK (if exists)
- Status: 404 Not Found (if doesn't exist)

