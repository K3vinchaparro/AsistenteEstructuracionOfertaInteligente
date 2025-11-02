import ClienteForm from '../components/ClienteForm'

const RegistroCliente = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Registro de Cliente
          </h2>
          <p className="text-gray-600">
            Complete el formulario para registrar un nuevo cliente en el sistema EnerCol
          </p>
        </div>
        <ClienteForm />
      </div>
    </div>
  )
}

export default RegistroCliente

