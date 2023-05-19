import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import Alerta from "../components/Alerta"
import { clienteAxios } from "../config/axios"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})

  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const { msg } = alerta

  const handleSubmit = async (event) => {
    event.preventDefault()
    if ([email, password].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true })
      return
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", { email, password })
      setAuth(data)
      localStorage.setItem("token", data.token)
      navigate("/admin")
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }



  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Inicia sesión y administra tus pacientes</h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form action="" onSubmit={handleSubmit}>
          {msg && <Alerta alerta={alerta} />}
          <div className='my-5'>
            <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
            <input type="email" className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' placeholder='Email de registro' value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          <div className='my-5'>
            <label htmlFor="" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
            <input type="password" className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
          </div>
          <button type='submit' className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-800'>Iniciar sesión</button>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between ">
          <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes cuenta? Regístrate</Link>
          <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvidé mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login