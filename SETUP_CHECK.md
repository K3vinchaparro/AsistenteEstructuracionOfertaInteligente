# ✅ Verificación de Configuración

## Pre-requisitos del Sistema

Verifica que tienes todo lo necesario instalado:

### Node.js y npm

```bash
node --version
npm --version
```

**Esperado:**
- Node.js >= 18.0.0
- npm >= 9.0.0

### Espacio en Disco

Asegúrate de tener al menos 500MB libres para node_modules.

---

## Checklist de Instalación

### ✅ Backend

```bash
cd enercol-backend
```

**Verificar:**
- [ ] `package.json` existe
- [ ] `src/app.js` existe
- [ ] `src/controllers/clienteController.js` existe
- [ ] `src/models/clienteModel.js` existe
- [ ] `src/routes/clienteRoutes.js` existe
- [ ] `src/middleware/errorHandler.js` existe
- [ ] `tests/api/cliente.test.js` existe

**Instalar dependencias:**
```bash
npm install
```

**Verificar instalación:**
```bash
npm list
```

**Deberías ver:**
- express
- cors
- dotenv
- jest (dev)
- supertest (dev)

### ✅ Frontend

```bash
cd enercol-frontend
```

**Verificar:**
- [ ] `package.json` existe
- [ ] `src/App.jsx` existe
- [ ] `src/main.jsx` existe
- [ ] `src/components/ClienteForm.jsx` existe
- [ ] `src/pages/RegistroCliente.jsx` existe
- [ ] `src/services/api.js` existe
- [ ] `src/index.css` existe
- [ ] `index.html` existe
- [ ] `vite.config.js` existe
- [ ] `tailwind.config.js` existe
- [ ] `postcss.config.js` existe

**Instalar dependencias:**
```bash
npm install
```

**Verificar instalación:**
```bash
npm list
```

**Deberías ver:**
- react
- react-dom
- vite
- tailwindcss
- axios
- react-hot-toast

---

## Verificación de Archivos de Configuración

### ✅ Backend

**jest.config.js**
```javascript
export default {
  testEnvironment: 'node',
  // ... config
}
```

**package.json scripts**
```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "node --watch src/app.js",
    "test": "jest"
  }
}
```

### ✅ Frontend

**vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
})
```

**tailwind.config.js**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { /* ... */ } },
  plugins: []
}
```

**postcss.config.js**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

---

## Pruebas de Funcionamiento

### 1️⃣ Iniciar Backend

```bash
cd enercol-backend
npm run dev
```

**Salida esperada:**
```
🚀 EnerCol Backend running on http://localhost:4000
📝 Health check: http://localhost:4000/health
```

**Verificar en navegador:**
- [ ] Abrir `http://localhost:4000/health`
- [ ] Ver `{"status":"OK","message":"EnerCol Backend API is running"}`

### 2️⃣ Iniciar Frontend

**En otra terminal:**
```bash
cd enercol-frontend
npm run dev
```

**Salida esperada:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

**Verificar en navegador:**
- [ ] Abrir `http://localhost:5173`
- [ ] Ver el formulario de registro completo
- [ ] Ver header "EnerCol - Sistema de Gestión Energética"
- [ ] Ver campos del formulario

### 3️⃣ Prueba de Integración Rápida

**En el formulario del frontend:**

1. Completar campos:
   - Razón Social: "Test Company"
   - NIT: "900123456-1"
   - Sector: Industrial
   - Modalidad: Mercado Regulado
   - Nombre: Juan Pérez
   - Correo: juan@test.com
   - Teléfono: +57 300 123 4567

2. Click en "Registrar Cliente"

3. **Resultado esperado:**
   - [ ] Toast verde: "Cliente registrado exitosamente"
   - [ ] Formulario se limpia
   - [ ] Backend muestra request en la terminal

4. Intentar registrar el mismo NIT otra vez

5. **Resultado esperado:**
   - [ ] Toast rojo: "El NIT ya está registrado en el sistema"
   - [ ] Error debajo del campo NIT

### 4️⃣ Pruebas Unitarias

```bash
cd enercol-backend
npm test
```

**Resultado esperado:**
```
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        X.XXXs
```

---

## Diagnóstico de Problemas

### ❌ Error: "Cannot find module"

**Causa:** node_modules no instalado correctamente

**Solución:**
```bash
# Eliminar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### ❌ Error: "Port already in use"

**Causa:** Otro proceso usando el puerto

**Solución:**

**Windows:**
```bash
netstat -ano | findstr :4000
taskkill /PID [PID] /F

netstat -ano | findstr :5173
taskkill /PID [PID] /F
```

**Linux/Mac:**
```bash
lsof -ti:4000 | xargs kill
lsof -ti:5173 | xargs kill
```

### ❌ Error: "CORS policy"

**Causa:** CORS no configurado correctamente

**Solución:**
Verificar `enercol-backend/src/app.js`:
```javascript
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || 'http://localhost:5173',
  credentials: true
}));
```

### ❌ Error: "Cannot GET /api/clientes"

**Causa:** Backend no está ejecutándose

**Solución:**
```bash
cd enercol-backend
npm run dev
```

### ❌ Error: Tests fallan

**Causa:** Configuración de Jest incorrecta

**Solución:**
Verificar `jest.config.js` y que el formato ESM sea correcto.

### ❌ Error: Tailwind no funciona

**Causa:** PostCSS no configurado

**Solución:**
Verificar que `postcss.config.js` existe y está correctamente configurado.

---

## ✅ Checklist Final

- [ ] Node.js y npm instalados
- [ ] Backend dependencias instaladas
- [ ] Frontend dependencias instaladas
- [ ] Backend inicia correctamente
- [ ] Frontend inicia correctamente
- [ ] Health check responde
- [ ] Formulario se muestra
- [ ] Puedo registrar un cliente
- [ ] Validación NIT duplicado funciona
- [ ] Mensajes de error aparecen
- [ ] Tests del backend pasan
- [ ] No hay errores en consola
- [ ] No hay errores de linter

---

## 🎉 ¡Todo Listo!

Si todos los checkboxes están marcados, tu entorno está configurado correctamente.

**Siguiente paso:** Lee [QUICK_START.md](QUICK_START.md) o [README.md](README.md) para comenzar a usar el sistema.

---

## 📞 Soporte

Si encuentras problemas no listados aquí:

1. Revisa los logs en las terminales
2. Verifica la documentación en cada README
3. Consulta el plan de pruebas en QA_PLAN.md
4. Contacta al equipo de desarrollo

