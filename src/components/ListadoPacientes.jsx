import PacientesContext from "../context/PacientesProvider"
import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {

  const { pacientes } = usePacientes(PacientesContext)
  return (
    <>
      {pacientes.length
        ?
        (<>
          <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
          <p className="text-lg text-center mb-10">Administra <span className="text-indigo-600 font-bold">tus pacientes</span></p>

          {pacientes.map(paciente =>
            <Paciente key={paciente._id} paciente={paciente} />
          )}
        </>)
        :
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes y aparecerán aquí</p>
        </>
      }
    </>
  )
}

export default ListadoPacientes