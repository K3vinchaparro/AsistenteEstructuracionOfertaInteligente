# EnerCol Frontend

Frontend application for EnerCol client registration system built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

```bash
# Development mode
npm run dev
```

The application will start on `http://localhost:5173`

### Building for Production

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
enercol-frontend/
├── src/
│   ├── components/
│   │   └── ClienteForm.jsx          # Client registration form
│   ├── pages/
│   │   └── RegistroCliente.jsx      # Registration page
│   ├── services/
│   │   └── api.js                   # API client
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── package.json                     # Dependencies
└── README.md                        # Documentation
```

## 🎨 Features

- **Form Validation**: Client-side validation for all required fields
- **File Upload**: Support for CSV/XLSX consumption history files (max 5MB)
- **Error Handling**: User-friendly error messages and notifications
- **Success Feedback**: Toast notifications for successful registrations
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **API Integration**: Seamless connection with backend API

## 📋 Form Fields

### Required Fields
- Razón Social
- NIT
- Sector Económico (Dropdown)
- Modalidad Contractual (Dropdown)
- Nombre de Contacto
- Correo de Contacto
- Teléfono de Contacto

### Optional Fields
- Archivo de Consumo Histórico (.CSV, .XLSX, .XLS)

## 🔗 API Integration

The frontend connects to the backend API at:
- Development: `http://localhost:4000`
- Configure via environment variable: `VITE_API_URL`

## 🧪 Testing

Tests can be added using:
- Jest + React Testing Library
- Vitest
- Cypress (E2E)

## 📝 Ticket Reference

- **DEV-FRONT-001**: Desarrollar formulario de registro de clientes

## 🛠️ Technology Stack

- **React 18**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **React Hot Toast**: Toast notifications

## 📄 License

ISC

