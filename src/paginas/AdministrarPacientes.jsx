import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

const AdministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  return (
    <div className="flex flex-col md:flex-row">
      <button type="button" className="mb-5 bg-indigo-600 text-white font-bold md:hidden uppercase mx-10 py-3 rounded-md" onClick={() => setMostrarFormulario(!mostrarFormulario)}>{mostrarFormulario ? "Ocultar formulario" : "Mostrar formulario"}</button>
      <div className={`${mostrarFormulario ? "block" : "hidden" } md:w-1/2 lg:w-2/5 md:block`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
      <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes