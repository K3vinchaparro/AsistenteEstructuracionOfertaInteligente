# Plan de Pruebas QA - Sistema EnerCol

**Ticket:** QA-TEST-001  
**Fecha:** 2024  
**Responsable:** QA Team

## 📋 Objetivo

Validar el correcto funcionamiento del sistema de registro de clientes según los criterios de aceptación definidos en los tickets DEV-BACK-001 y DEV-FRONT-001.

---

## 🎯 Criterios de Aceptación

### Ticket DEV-BACK-001: Servicio REST para Registro de Clientes

#### CA-001: Endpoint POST /api/clientes
- ✅ El endpoint debe recibir y registrar información del cliente
- ✅ Los datos deben ser almacenados correctamente
- ✅ Debe retornar código HTTP 201 al registrar exitosamente
- ✅ Debe incluir el cliente registrado en la respuesta

**Caso de Prueba CP-001:**
```
Dado que el backend está ejecutándose
Cuando envío un POST a /api/clientes con datos válidos
Entonces debo recibir un código 201
Y la respuesta debe contener el cliente con ID asignado
```

**Datos de Prueba:**
```json
{
  "razonSocial": "Test Company S.A.",
  "nit": "999999999-1",
  "sectorEconomico": "Industrial",
  "modalidadContratual": "Mercado Regulado",
  "nombreContacto": "Test User",
  "correoContacto": "test@example.com",
  "telefonoContacto": "+57 300 000 0000"
}
```

#### CA-002: Validación de NIT Único
- ✅ No se debe permitir registrar un cliente con NIT duplicado
- ✅ Debe retornar código HTTP 409 (Conflict)
- ✅ El mensaje de error debe indicar que el NIT ya existe

**Caso de Prueba CP-002:**
```
Dado que existe un cliente con NIT "999999999-1"
Cuando intento registrar otro cliente con el mismo NIT
Entonces debo recibir un código 409
Y el mensaje debe indicar "NIT duplicado"
```

#### CA-003: Validación de Campos Requeridos
- ✅ Debe validar que todos los campos obligatorios estén presentes
- ✅ Debe retornar código HTTP 400 si faltan campos
- ✅ El mensaje debe indicar qué campos son requeridos

**Campos Requeridos:**
- razonSocial
- nit
- sectorEconomico
- modalidadContratual
- nombreContacto
- correoContacto
- telefonoContacto

**Caso de Prueba CP-003:**
```
Dado que el backend está ejecutándose
Cuando envío un POST a /api/clientes con campos faltantes
Entonces debo recibir un código 400
Y el mensaje debe indicar "Campos requeridos faltantes"
```

#### CA-004: Validación de Formato de Correo
- ✅ Debe validar el formato del correo electrónico
- ✅ Debe retornar código HTTP 400 si el formato es inválido
- ✅ Debe aceptar correos válidos

**Caso de Prueba CP-004:**
```
Dado que el backend está ejecutándose
Cuando envío un POST con correo "invalid-email"
Entonces debo recibir un código 400
Y el mensaje debe indicar "Formato de correo inválido"
```

#### CA-005: Almacenamiento de Ruta de Archivo
- ✅ Debe almacenar la ruta del archivo de consumo histórico
- ✅ La ruta es opcional (puede ser null)
- ✅ Debe estar presente en la respuesta

**Caso de Prueba CP-005:**
```
Dado que registro un cliente con rutaArchivoConsumo
Cuando consulto el cliente registrado
Entonces la ruta debe estar almacenada correctamente
```

---

### Ticket DEV-FRONT-001: Formulario de Registro de Clientes

#### CA-006: Renderizado del Formulario
- ✅ El formulario debe mostrar todos los campos requeridos
- ✅ Los campos deben tener labels apropiados
- ✅ Los campos obligatorios deben estar marcados con *

**Caso de Prueba CP-006:**
```
Dado que estoy en la página de registro
Cuando visualizo el formulario
Entonces debo ver todos los campos requeridos
Y los campos obligatorios deben tener un indicador *
```

**Campos Esperados:**
1. Razón Social
2. NIT
3. Sector Económico (dropdown)
4. Modalidad Contractual (dropdown)
5. Nombre de Contacto
6. Correo de Contacto
7. Teléfono de Contacto
8. Archivo de Consumo Histórico (opcional)

#### CA-007: Validación de Campos Obligatorios
- ✅ El formulario debe validar campos requeridos antes del envío
- ✅ Debe mostrar mensajes de error específicos
- ✅ No debe permitir envío si hay errores

**Caso de Prueba CP-007:**
```
Dado que estoy en el formulario de registro
Cuando intento enviar sin completar campos requeridos
Entonces debo ver mensajes de error
Y no se debe enviar el formulario
```

#### CA-008: Validación de Archivo
- ✅ Solo debe aceptar archivos .CSV, .XLSX, .XLS
- ✅ El tamaño máximo debe ser 5MB
- ✅ Debe mostrar mensaje de error si el archivo no cumple

**Caso de Prueba CP-008:**
```
Dado que estoy en el formulario de registro
Cuando intento subir un archivo .PDF
Entonces debo ver un mensaje de error
Y el archivo no debe ser aceptado
```

**Caso de Prueba CP-009:**
```
Dado que estoy en el formulario de registro
Cuando intento subir un archivo mayor a 5MB
Entonces debo ver un mensaje de error
Y el archivo no debe ser aceptado
```

#### CA-009: Envío Exitoso
- ✅ Debe enviar los datos al endpoint POST /api/clientes
- ✅ Debe mostrar mensaje de confirmación
- ✅ Debe limpiar el formulario después del envío exitoso

**Caso de Prueba CP-010:**
```
Dado que he completado el formulario con datos válidos
Cuando presiono "Registrar Cliente"
Entonces debo ver un mensaje "Cliente registrado exitosamente"
Y el formulario debe quedar vacío
```

#### CA-010: Manejo de Errores
- ✅ Debe mostrar mensaje cuando el NIT ya existe
- ✅ Debe mostrar mensaje cuando no hay conexión con el backend
- ✅ Debe mostrar mensajes de error apropiados según el código HTTP

**Caso de Prueba CP-011:**
```
Dado que el backend retorna un error 409
Cuando el frontend recibe la respuesta
Entonces debo ver un mensaje "El NIT ya está registrado en el sistema"
```

**Caso de Prueba CP-012:**
```
Dado que el backend no está ejecutándose
Cuando intento registrar un cliente
Entonces debo ver un mensaje "No se pudo conectar con el servidor"
```

---

## 🧪 Matriz de Pruebas

| ID | Tipo | Criterio | Estado | Resultado |
|----|------|----------|--------|-----------|
| CP-001 | Backend | CA-001 | ✅ | PENDIENTE |
| CP-002 | Backend | CA-002 | ✅ | PENDIENTE |
| CP-003 | Backend | CA-003 | ✅ | PENDIENTE |
| CP-004 | Backend | CA-004 | ✅ | PENDIENTE |
| CP-005 | Backend | CA-005 | ✅ | PENDIENTE |
| CP-006 | Frontend | CA-006 | ✅ | PENDIENTE |
| CP-007 | Frontend | CA-007 | ✅ | PENDIENTE |
| CP-008 | Frontend | CA-008 | ✅ | PENDIENTE |
| CP-009 | Frontend | CA-008 | ✅ | PENDIENTE |
| CP-010 | Frontend | CA-009 | ✅ | PENDIENTE |
| CP-011 | Frontend | CA-010 | ✅ | PENDIENTE |
| CP-012 | Frontend | CA-010 | ✅ | PENDIENTE |

---

## 🔬 Tipos de Pruebas

### Pruebas Unitarias
- **Backend**: Jest + Supertest
- **Frontend**: React Testing Library + Jest/Vitest
- **Cobertura objetivo**: > 80%

### Pruebas de Integración
- Flujo completo Frontend → Backend
- Validación de comunicación API
- Manejo de errores end-to-end

### Pruebas E2E (Opcional)
- Cypress para navegación completa
- Simulación de usuario real
- Validación de UX

---

## 📝 Instrucciones de Ejecución

### Ejecutar Pruebas Backend

```bash
cd enercol-backend
npm test
```

### Ejecutar Pruebas Frontend

```bash
cd enercol-frontend
npm test
```

### Ejecutar Pruebas Manuales

1. Iniciar el backend en `http://localhost:4000`
2. Iniciar el frontend en `http://localhost:5173`
3. Ejecutar casos de prueba CP-001 a CP-012 manualmente
4. Documentar resultados en la matriz de pruebas

---

## 🐛 Casos Especiales

### Casos Límite
- NIT con formato especial (con guiones, espacios)
- Correo con caracteres especiales
- Nombre con caracteres Unicode
- Archivo exactamente de 5MB

### Casos de Error
- Timeout del servidor
- Respuesta mal formada del backend
- Pérdida de conexión durante el envío
- CORS errors

---

## 📊 Métricas de Calidad

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Cobertura de Código | > 80% | - |
| Tiempo de Respuesta API | < 200ms | - |
| Tiempo de Carga Frontend | < 2s | - |
| Bugs Críticos | 0 | - |
| Bugs Mayores | ≤ 2 | - |

---

## ✅ Aprobación

**Ejecutado por:** ________________  
**Fecha:** ________________  
**Aprobado por:** ________________  
**Fecha:** ________________

---

## 📚 Referencias

- [DEV-BACK-001](./enercol-backend/README.md)
- [DEV-FRONT-001](./enercol-frontend/README.md)
- [Postman Collection](./tests/api/postman_collection.json) (si aplica)
- [Cypress Tests](./tests/ui/cypress/) (si aplica)

