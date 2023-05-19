import React from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {

  const { auth, actualizarPerfil } = useAuth()
  const [perfil, setPerfil] = useState({})
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    setPerfil(auth)
  }, [auth])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if ([perfil.nombre, perfil.email].includes("")) {
      setAlerta({
        msg: "El nombre e email son obligatorios",
        error: true
      })
      return
    }
    const resultado = await actualizarPerfil(perfil)
    setAlerta(resultado)
  }

  const { msg } = alerta

  return (
    <>
      <AdminNav />
      <h2 className='font-black text-3xl text-center mt-10'>Modificar perfil</h2>
      <p className='text-xl mt-5 mb-10 text-center'>Modifica tu <span className='text-indigo-600 font-bold'>Perfil</span></p>
      <div className='flex justify-center'>
        <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Nombre</label>
              <input name='nombre'
                type="text"
                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                value={perfil.nombre || ""}
                onChange={event => setPerfil(
                  {
                    ...perfil,
                    [event.target.name]: event.target.value
                  })} />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Sitio web</label>
              <input name='web' type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                onChange={event => setPerfil(
                  {
                    ...perfil,
                    [event.target.name]: event.target.value
                  })}
                value={perfil.web || ""} />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Telefono</label>
              <input name='telefono' type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                onChange={event => setPerfil(
                  {
                    ...perfil,
                    [event.target.name]: event.target.value
                  })}
                value={perfil.telefono || ""} />
            </div>
            <div className='my-3'>
              <label className='uppercase font-bold text-gray-600'>Email</label>
              <input name='email' type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                onChange={event => setPerfil(
                  {
                    ...perfil,
                    [event.target.name]: event.target.value
                  })}
                value={perfil.email || ""} />
            </div>
            <button type='submit' className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'>Guardar cambios</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditarPerfil