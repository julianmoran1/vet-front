import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {

  const [nombre, setNombre] = useState("")
  const [propietario, setPropietario] = useState("")
  const [email, setEmail] = useState("")
  const [fecha, setFecha] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({})

  const { guardarPaciente, paciente } = usePacientes()

  const handleSubmit = event => {
    event.preventDefault()
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
    setAlerta({
      msg: "Cambio guardado correctamente",
    })
    setNombre("")
    setPropietario("")
    setEmail("")
    setFecha("")
    setSintomas("")
    setId(null)
  }

  const { msg } = alerta

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  }, [paciente])

  return (
    <>
      <h2 className="font-black text-3xl text-center">Registra un paciente</h2>
      <p className="text-lg text-center mb-10">Añade tus pacientes y <span className="text-indigo-600 font-bold">Administralos</span></p>
      <form action="" className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre de la mascota</label>
          <input type="text" id="nombre" placeholder="nombre de la nombre" className="border-2
      w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={event => setNombre(event.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre propietario</label>
          <input type="text" id="propietario" placeholder="nombre del propietario" className="border-2
      w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={event => setPropietario(event.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email propietario</label>
          <input type="email" id="email" placeholder="email" className="border-2
      w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={event => setEmail(event.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha alta</label>
          <input type="date" id="fecha" className="border-2
      w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={event => setFecha(event.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">sintomas</label>
          <textarea id="sintomas" className="border-2
      w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Describe los síntomas" value={sintomas} onChange={event => setSintomas(event.target.value)} />
        </div>

        <button type="submit" className="bg-indigo-600 w-full text-white p-3 uppercase font-bold hover:bg-indigo-800 transition-colors">{id ? "Guardar cambios" : "Agregar paciente"}</button>

      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  )
}

export default Formulario