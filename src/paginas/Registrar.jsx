import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import { clienteAxios } from "../config/axios"

const Registrar = () => {

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async (event) => {
    event.preventDefault()
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true })
      return
    }

    if (password != repetirPassword) {
      setAlerta({ msg: "los passwords no son iguales", error: true })
      return
    }

    if (password.length < 6) {
      setAlerta({ msg: "password corto", error: true })
      return
    }

    setAlerta({})

    // crear el usuario en la api
    try {
      await clienteAxios.post("/veterinarios", { nombre, email, password })
      setAlerta({ msg: "Creado correctamente. Revisa tu email", error: false })
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true })
    }
  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Crea tu cuenta y administra tus pacientes</h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {
          msg && <Alerta alerta={alerta} />
        }
        <form onSubmit={handleSubmit} action="">
          <div className='my-5'>
            <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
            <input type="text" className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' placeholder='Nombre' value={nombre} onChange={event => setNombre(event.target.value)} />
          </div>
          <div className='my-5'>
            <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
            <input type="email" className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' placeholder='Email de registro' value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          <div className='my-5'>
            <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
            <input type="password" className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
          </div>
          <div className='my-5'>
            <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Repetir password</label>
            <input type="password" className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' placeholder='Repetir Password' value={repetirPassword} onChange={event => setRepetirPassword(event.target.value)} />
          </div>
          <button type='submit' className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-800'>Registrarse</button>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between ">
          <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes cuenta? Inicia sesión</Link>
          <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvidé mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar