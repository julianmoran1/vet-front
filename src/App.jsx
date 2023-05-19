import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import RutaProtegida from "./layout/RutaProtegida"

import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import Login from "./paginas/Login"
import NuevoPassword from "./paginas/NuevoPassword"
import OlvidePassword from "./paginas/OlvidePassword"
import Registrar from "./paginas/Registrar"
import EditarPerfil from "./paginas/EditarPerfil"
import CambiarPassword from "./paginas/CambiarPassword"

import AdministrarPacientes from "./paginas/AdministrarPacientes"

import { AuthProvider } from "./context/AuthProvider"
import { PacientesProvider } from "./context/PacientesProvider"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>

          <Routes>
            {/* AREA PÚBLICA */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
            </Route>

            {/* AREA PRIVADA */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="actualizar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
