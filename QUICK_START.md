# 🚀 Guía de Inicio Rápido - EnerCol

Este documento te guiará paso a paso para ejecutar el proyecto EnerCol completo.

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Backend

Abre una terminal y ejecuta:

```bash
cd enercol-backend
npm install
npm run dev
```

Deberías ver:
```
🚀 EnerCol Backend running on http://localhost:4000
📝 Health check: http://localhost:4000/health
```

✅ Verifica que funciona: Abre `http://localhost:4000/health` en tu navegador

### 2️⃣ Frontend

Abre **otra terminal** (deja el backend ejecutándose) y ejecuta:

```bash
cd enercol-frontend
npm install
npm run dev
```

Deberías ver:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ Abre tu navegador en `http://localhost:5173`

---

## 🧪 Prueba el Sistema

### Registro de Cliente Exitoso

1. **Razón Social**: Test Company S.A.
2. **NIT**: 900123456-1
3. **Sector Económico**: Industrial
4. **Modalidad Contractual**: Mercado Regulado
5. **Nombre de Contacto**: Juan Pérez
6. **Correo**: juan.perez@empresa.com
7. **Teléfono**: +57 300 123 4567
8. **Archivo**: (opcional) cualquier archivo .xlsx menor a 5MB

Click en **"Registrar Cliente"** → Deberías ver ✅ "Cliente registrado exitosamente"

### Prueba de Validación

Intenta registrar el mismo NIT dos veces → Deberías ver ❌ "El NIT ya está registrado"

---

## 🧪 Ejecutar Pruebas

### Backend Tests

```bash
cd enercol-backend
npm test
```

### Backend con Postman

1. Importa la colección desde: `tests/api/postman_example.md`
2. Ejecuta los requests individualmente

---

## 🔍 Verificar la Instalación

### Checklist Pre-ejecución

- [ ] Node.js >= 18 instalado: `node --version`
- [ ] npm instalado: `npm --version`
- [ ] Backend ejecutándose en puerto 4000
- [ ] Frontend ejecutándose en puerto 5173
- [ ] No hay conflictos de puertos

### Checklist Post-ejecución

- [ ] Backend responde en `/health`
- [ ] Frontend carga correctamente
- [ ] Formulario se muestra completo
- [ ] Validaciones funcionan
- [ ] Puedes registrar un cliente
- [ ] Mensajes de error/éxito aparecen

---

## 🐛 Solución de Problemas

### Backend no inicia

**Error**: `Port 4000 already in use`

**Solución**:
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:4000 | xargs kill
```

### Frontend no inicia

**Error**: `Port 5173 already in use`

**Solución**: Mismo proceso anterior, cambiar el puerto

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solución**: Verifica que `ALLOWED_ORIGINS=http://localhost:5173` esté en `.env` del backend

### No se puede conectar al backend

**Error**: `No se pudo conectar con el servidor`

**Solución**: 
1. Verifica que el backend esté ejecutándose
2. Verifica que `http://localhost:4000/health` responda
3. Verifica `VITE_API_URL` en frontend

---

## 📁 Estructura de Archivos Importantes

```
enercol-workspace/
├── .gitignore                    # Archivos ignorados por Git
├── README.md                     # Documentación principal
├── QA_PLAN.md                    # Plan de pruebas completo
├── QUICK_START.md                # Este archivo
│
├── enercol-backend/
│   ├── src/
│   │   ├── app.js               # ⭐ Punto de entrada backend
│   │   ├── controllers/         # Lógica de negocio
│   │   ├── models/              # Modelo de datos
│   │   ├── routes/              # Rutas API
│   │   └── middleware/          # Middleware
│   ├── tests/                   # Tests unitarios
│   ├── package.json             # Dependencias backend
│   └── jest.config.js           # Configuración Jest
│
├── enercol-frontend/
│   ├── src/
│   │   ├── main.jsx             # ⭐ Punto de entrada frontend
│   │   ├── App.jsx              # Componente principal
│   │   ├── components/          # Componentes React
│   │   ├── pages/               # Páginas
│   │   └── services/            # API client
│   ├── package.json             # Dependencias frontend
│   └── vite.config.js           # Configuración Vite
│
└── tests/
    ├── api/                     # Pruebas API (Postman)
    └── ui/                      # Pruebas E2E (Cypress)
```

---

## 🎯 Próximos Pasos

Una vez que el sistema básico funcione:

1. ✅ Lee [README.md](README.md) para la documentación completa
2. ✅ Revisa [QA_PLAN.md](QA_PLAN.md) para el plan de pruebas
3. ✅ Ejecuta los tests del backend: `cd enercol-backend && npm test`
4. ✅ Configura Postman para pruebas de API
5. ✅ Integra Cypress para pruebas E2E

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica los logs del backend y frontend en las terminales
2. Revisa el archivo `QA_PLAN.md` para casos de prueba
3. Consulta los README individuales de cada proyecto
4. Contacta al equipo de desarrollo

---

## ✨ Características Principales

### Backend (Port 4000)
- ✅ API REST completa
- ✅ Validación de NIT único
- ✅ Validación de campos requeridos
- ✅ Manejo de errores HTTP
- ✅ CORS configurado

### Frontend (Port 5173)
- ✅ Formulario completo y responsivo
- ✅ Validación client-side
- ✅ Carga de archivos (CSV/XLSX)
- ✅ Notificaciones toast
- ✅ Manejo de errores
- ✅ Diseño moderno con Tailwind

---

**¡Listo para empezar! 🎉**

Ejecuta los comandos de arriba y tendrás el sistema EnerCol funcionando en minutos.

