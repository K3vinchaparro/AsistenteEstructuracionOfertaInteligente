import { useState } from 'react'
import toast from 'react-hot-toast'
import { registrarCliente } from '../services/api'

const ClienteForm = () => {
  const [formData, setFormData] = useState({
    razonSocial: '',
    nit: '',
    sectorEconomico: '',
    modalidadContratual: '',
    nombreContacto: '',
    correoContacto: '',
    telefonoContacto: '',
    archivoConsumo: null
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB in bytes
      if (file.size > maxSize) {
        toast.error('El archivo debe ser menor a 5MB')
        e.target.value = ''
        return
      }

      // Validate file type
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ]
      
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
        toast.error('Solo se permiten archivos .CSV o .XLSX')
        e.target.value = ''
        return
      }

      setFormData(prev => ({
        ...prev,
        archivoConsumo: file
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required field validation
    if (!formData.razonSocial.trim()) {
      newErrors.razonSocial = 'La razón social es requerida'
    }

    if (!formData.nit.trim()) {
      newErrors.nit = 'El NIT es requerido'
    }

    if (!formData.sectorEconomico.trim()) {
      newErrors.sectorEconomico = 'El sector económico es requerido'
    }

    if (!formData.modalidadContratual.trim()) {
      newErrors.modalidadContratual = 'La modalidad contractual es requerida'
    }

    if (!formData.nombreContacto.trim()) {
      newErrors.nombreContacto = 'El nombre de contacto es requerido'
    }

    if (!formData.correoContacto.trim()) {
      newErrors.correoContacto = 'El correo de contacto es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoContacto)) {
      newErrors.correoContacto = 'El formato del correo no es válido'
    }

    if (!formData.telefonoContacto.trim()) {
      newErrors.telefonoContacto = 'El teléfono de contacto es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Por favor, corrija los errores en el formulario')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare data for API (file handling would normally upload to server first)
      const clienteData = {
        razonSocial: formData.razonSocial,
        nit: formData.nit,
        sectorEconomico: formData.sectorEconomico,
        modalidadContratual: formData.modalidadContratual,
        nombreContacto: formData.nombreContacto,
        correoContacto: formData.correoContacto,
        telefonoContacto: formData.telefonoContacto,
        rutaArchivoConsumo: formData.archivoConsumo 
          ? `/uploads/${formData.archivoConsumo.name}` 
          : null
      }

      const response = await registrarCliente(clienteData)
      
      toast.success(response.message || 'Cliente registrado exitosamente')
      
      // Reset form
      setFormData({
        razonSocial: '',
        nit: '',
        sectorEconomico: '',
        modalidadContratual: '',
        nombreContacto: '',
        correoContacto: '',
        telefonoContacto: '',
        archivoConsumo: null
      })
      
      // Reset file input
      const fileInput = document.getElementById('archivoConsumo')
      if (fileInput) fileInput.value = ''

    } catch (error) {
      if (error.status === 409) {
        toast.error('El NIT ya está registrado en el sistema')
        setErrors({ nit: 'Este NIT ya está registrado' })
      } else if (error.status === 400) {
        toast.error(error.message || 'Los datos del formulario no son válidos')
      } else if (error.status === 0) {
        toast.error('No se pudo conectar con el servidor. Verifique que el backend esté ejecutándose.')
      } else {
        toast.error(error.message || 'Error al registrar el cliente')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      razonSocial: '',
      nit: '',
      sectorEconomico: '',
      modalidadContratual: '',
      nombreContacto: '',
      correoContacto: '',
      telefonoContacto: '',
      archivoConsumo: null
    })
    setErrors({})
    const fileInput = document.getElementById('archivoConsumo')
    if (fileInput) fileInput.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Razón Social */}
      <div>
        <label htmlFor="razonSocial" className="label-field">
          Razón Social <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="razonSocial"
          name="razonSocial"
          value={formData.razonSocial}
          onChange={handleChange}
          className={`input-field ${errors.razonSocial ? 'border-red-500' : ''}`}
          placeholder="Ej: Empresa de Energía S.A."
        />
        {errors.razonSocial && <p className="error-message">{errors.razonSocial}</p>}
      </div>

      {/* NIT */}
      <div>
        <label htmlFor="nit" className="label-field">
          NIT <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nit"
          name="nit"
          value={formData.nit}
          onChange={handleChange}
          className={`input-field ${errors.nit ? 'border-red-500' : ''}`}
          placeholder="Ej: 900123456-1"
        />
        {errors.nit && <p className="error-message">{errors.nit}</p>}
      </div>

      {/* Sector Económico */}
      <div>
        <label htmlFor="sectorEconomico" className="label-field">
          Sector Económico <span className="text-red-500">*</span>
        </label>
        <select
          id="sectorEconomico"
          name="sectorEconomico"
          value={formData.sectorEconomico}
          onChange={handleChange}
          className={`input-field ${errors.sectorEconomico ? 'border-red-500' : ''}`}
        >
          <option value="">Seleccione un sector</option>
          <option value="Industrial">Industrial</option>
          <option value="Comercial">Comercial</option>
          <option value="Residencial">Residencial</option>
          <option value="Servicios">Servicios</option>
          <option value="Agropecuario">Agropecuario</option>
          <option value="Minero">Minero</option>
        </select>
        {errors.sectorEconomico && <p className="error-message">{errors.sectorEconomico}</p>}
      </div>

      {/* Modalidad Contractual */}
      <div>
        <label htmlFor="modalidadContratual" className="label-field">
          Modalidad Contractual <span className="text-red-500">*</span>
        </label>
        <select
          id="modalidadContratual"
          name="modalidadContratual"
          value={formData.modalidadContratual}
          onChange={handleChange}
          className={`input-field ${errors.modalidadContratual ? 'border-red-500' : ''}`}
        >
          <option value="">Seleccione una modalidad</option>
          <option value="Mercado Regulado">Mercado Regulado</option>
          <option value="Mercado No Regulado">Mercado No Regulado</option>
          <option value="Autogeneración">Autogeneración</option>
          <option value="Distribución">Distribución</option>
        </select>
        {errors.modalidadContratual && <p className="error-message">{errors.modalidadContratual}</p>}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Datos de Contacto</h3>
      </div>

      {/* Nombre de Contacto */}
      <div>
        <label htmlFor="nombreContacto" className="label-field">
          Nombre de Contacto <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nombreContacto"
          name="nombreContacto"
          value={formData.nombreContacto}
          onChange={handleChange}
          className={`input-field ${errors.nombreContacto ? 'border-red-500' : ''}`}
          placeholder="Ej: Juan Pérez"
        />
        {errors.nombreContacto && <p className="error-message">{errors.nombreContacto}</p>}
      </div>

      {/* Correo de Contacto */}
      <div>
        <label htmlFor="correoContacto" className="label-field">
          Correo de Contacto <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="correoContacto"
          name="correoContacto"
          value={formData.correoContacto}
          onChange={handleChange}
          className={`input-field ${errors.correoContacto ? 'border-red-500' : ''}`}
          placeholder="Ej: juan.perez@empresa.com"
        />
        {errors.correoContacto && <p className="error-message">{errors.correoContacto}</p>}
      </div>

      {/* Teléfono de Contacto */}
      <div>
        <label htmlFor="telefonoContacto" className="label-field">
          Teléfono de Contacto <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="telefonoContacto"
          name="telefonoContacto"
          value={formData.telefonoContacto}
          onChange={handleChange}
          className={`input-field ${errors.telefonoContacto ? 'border-red-500' : ''}`}
          placeholder="Ej: +57 300 123 4567"
        />
        {errors.telefonoContacto && <p className="error-message">{errors.telefonoContacto}</p>}
      </div>

      {/* Archivo de Consumo Histórico */}
      <div>
        <label htmlFor="archivoConsumo" className="label-field">
          Archivo de Consumo Histórico
        </label>
        <input
          type="file"
          id="archivoConsumo"
          name="archivoConsumo"
          onChange={handleFileChange}
          accept=".csv,.xlsx,.xls"
          className="input-field"
        />
        <p className="text-sm text-gray-500 mt-1">
          Formatos permitidos: .CSV, .XLSX, .XLS (máximo 5MB)
        </p>
        {formData.archivoConsumo && (
          <p className="text-sm text-green-600 mt-1">
            ✓ Archivo seleccionado: {formData.archivoConsumo.name}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registrando...
            </span>
          ) : (
            'Registrar Cliente'
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isSubmitting}
          className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpiar Formulario
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        Los campos marcados con <span className="text-red-500">*</span> son obligatorios
      </p>
    </form>
  )
}

export default ClienteForm

