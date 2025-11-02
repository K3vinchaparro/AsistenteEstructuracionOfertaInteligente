# Cypress E2E Tests - EnerCol Frontend

## Setup

```bash
cd enercol-frontend
npm install -D cypress
npx cypress open
```

## Example Test File

Create: `enercol-frontend/cypress/e2e/cliente.cy.js`

```javascript
describe('Cliente Registration Form', () => {
  beforeEach(() => {
    // Ensure backend is running
    cy.visit('http://localhost:5173')
  })

  it('should display the registration form', () => {
    cy.get('h2').should('contain', 'Registro de Cliente')
    cy.get('input[name="razonSocial"]').should('be.visible')
    cy.get('input[name="nit"]').should('be.visible')
    cy.get('select[name="sectorEconomico"]').should('be.visible')
    cy.get('select[name="modalidadContratual"]').should('be.visible')
    cy.get('input[name="nombreContacto"]').should('be.visible')
    cy.get('input[name="correoContacto"]').should('be.visible')
    cy.get('input[name="telefonoContacto"]').should('be.visible')
    cy.get('input[name="archivoConsumo"]').should('be.visible')
  })

  it('should show validation errors for empty required fields', () => {
    cy.get('button[type="submit"]').click()
    
    cy.contains('La razón social es requerida').should('be.visible')
    cy.contains('El NIT es requerido').should('be.visible')
    cy.contains('El sector económico es requerido').should('be.visible')
    cy.contains('La modalidad contractual es requerida').should('be.visible')
    cy.contains('El nombre de contacto es requerido').should('be.visible')
    cy.contains('El correo de contacto es requerido').should('be.visible')
    cy.contains('El teléfono de contacto es requerido').should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('input[name="razonSocial"]').type('Test Company')
    cy.get('input[name="nit"]').type('999999999-1')
    cy.get('select[name="sectorEconomico"]').select('Industrial')
    cy.get('select[name="modalidadContratual"]').select('Mercado Regulado')
    cy.get('input[name="nombreContacto"]').type('Test User')
    cy.get('input[name="correoContacto"]').type('invalid-email')
    cy.get('input[name="telefonoContacto"]').type('+57 300 000 0000')
    
    cy.get('button[type="submit"]').click()
    cy.contains('El formato del correo no es válido').should('be.visible')
  })

  it('should validate file type and size', () => {
    // Test invalid file type
    cy.get('input[name="archivoConsumo"]').selectFile({
      contents: Cypress.Buffer.from('test content'),
      fileName: 'test.pdf',
      mimeType: 'application/pdf'
    })
    
    cy.contains('Solo se permiten archivos .CSV o .XLSX').should('be.visible')
    
    // Test file too large
    cy.get('input[name="archivoConsumo"]').selectFile({
      contents: Cypress.Buffer.from(new Array(6 * 1024 * 1024).fill('a')),
      fileName: 'large.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    
    cy.contains('El archivo debe ser menor a 5MB').should('be.visible')
  })

  it('should successfully register a client', () => {
    // Mock API call
    cy.intercept('POST', 'http://localhost:4000/api/clientes', {
      statusCode: 201,
      body: {
        message: 'Cliente registrado exitosamente',
        cliente: {
          id: 1,
          razonSocial: 'Test Company',
          nit: '999999999-1',
          sectorEconomico: 'Industrial',
          modalidadContratual: 'Mercado Regulado',
          nombreContacto: 'Test User',
          correoContacto: 'test@example.com',
          telefonoContacto: '+57 300 000 0000',
          fechaRegistro: new Date().toISOString()
        }
      }
    }).as('registerClient')

    cy.get('input[name="razonSocial"]').type('Test Company')
    cy.get('input[name="nit"]').type('999999999-1')
    cy.get('select[name="sectorEconomico"]').select('Industrial')
    cy.get('select[name="modalidadContratual"]').select('Mercado Regulado')
    cy.get('input[name="nombreContacto"]').type('Test User')
    cy.get('input[name="correoContacto"]').type('test@example.com')
    cy.get('input[name="telefonoContacto"]').type('+57 300 000 0000')
    
    cy.get('button[type="submit"]').click()
    
    cy.wait('@registerClient')
    cy.contains('Cliente registrado exitosamente').should('be.visible')
    
    // Verify form is cleared
    cy.get('input[name="razonSocial"]').should('have.value', '')
  })

  it('should handle duplicate NIT error', () => {
    cy.intercept('POST', 'http://localhost:4000/api/clientes', {
      statusCode: 409,
      body: {
        error: 'NIT duplicado',
        message: 'Ya existe un cliente registrado con el NIT: 999999999-1'
      }
    }).as('duplicateNIT')

    cy.get('input[name="razonSocial"]').type('Test Company')
    cy.get('input[name="nit"]').type('999999999-1')
    cy.get('select[name="sectorEconomico"]').select('Industrial')
    cy.get('select[name="modalidadContratual"]').select('Mercado Regulado')
    cy.get('input[name="nombreContacto"]').type('Test User')
    cy.get('input[name="correoContacto"]').type('test@example.com')
    cy.get('input[name="telefonoContacto"]').type('+57 300 000 0000')
    
    cy.get('button[type="submit"]').click()
    
    cy.wait('@duplicateNIT')
    cy.contains('El NIT ya está registrado en el sistema').should('be.visible')
  })

  it('should handle network errors gracefully', () => {
    cy.intercept('POST', 'http://localhost:4000/api/clientes', {
      forceNetworkError: true
    }).as('networkError')

    cy.get('input[name="razonSocial"]').type('Test Company')
    cy.get('input[name="nit"]').type('999999999-1')
    cy.get('select[name="sectorEconomico"]').select('Industrial')
    cy.get('select[name="modalidadContratual"]').select('Mercado Regulado')
    cy.get('input[name="nombreContacto"]').type('Test User')
    cy.get('input[name="correoContacto"]').type('test@example.com')
    cy.get('input[name="telefonoContacto"]').type('+57 300 000 0000')
    
    cy.get('button[type="submit"]').click()
    
    cy.wait('@networkError')
    cy.contains('No se pudo conectar con el servidor').should('be.visible')
  })

  it('should clear form when clicking reset button', () => {
    cy.get('input[name="razonSocial"]').type('Test Company')
    cy.get('input[name="nit"]').type('999999999-1')
    cy.get('select[name="sectorEconomico"]').select('Industrial')
    
    cy.get('button[type="button"]').contains('Limpiar Formulario').click()
    
    cy.get('input[name="razonSocial"]').should('have.value', '')
    cy.get('input[name="nit"]').should('have.value', '')
    cy.get('select[name="sectorEconomico"]').should('have.value', '')
  })

  it('should show loading state during submission', () => {
    cy.intercept('POST', 'http://localhost:4000/api/clientes', {
      delay: 1000,
      statusCode: 201,
      body: { message: 'Success', cliente: {} }
    }).as('slowRequest')

    cy.get('input[name="razonSocial"]').type('Test Company')
    cy.get('input[name="nit"]').type('999999999-1')
    cy.get('select[name="sectorEconomico"]').select('Industrial')
    cy.get('select[name="modalidadContratual"]').select('Mercado Regulado')
    cy.get('input[name="nombreContacto"]').type('Test User')
    cy.get('input[name="correoContacto"]').type('test@example.com')
    cy.get('input[name="telefonoContacto"]').type('+57 300 000 0000')
    
    cy.get('button[type="submit"]').click()
    
    cy.contains('Registrando...').should('be.visible')
    cy.get('button[type="submit"]').should('be.disabled')
    
    cy.wait('@slowRequest')
  })
})
```

## Running Tests

```bash
# Open Cypress GUI
npx cypress open

# Run tests headless
npx cypress run

# Run specific test
npx cypress run --spec "cypress/e2e/cliente.cy.js"
```

## Prerequisites

1. Backend must be running on `http://localhost:4000`
2. Frontend must be running on `http://localhost:5173`

