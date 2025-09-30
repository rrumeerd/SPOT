import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Rutas, Route as Ruta } from 'react-router-dom';
import { ProveedordeUsuario } from './contextos/contextodeUsuario';
import Bienvenida from './pantallas/bienvenida';
import Inicio from './pantallas/inicio';
import Registro from './pantallas/registro';
import IniciodeSesion from './pantallas/iniciodeSesion';

/* CLiente */
import Mapa from './pantallas/cliente/mapa';
import Usuario from './pantallas/cliente/usuario'
import Vehiculos from './pantallas/cliente/vehiculos';

/* Negocio */
import BasedeDatos from './pantallas/negocio/basedeDatos';
import Negocios from './pantallas/negocio/negocios';

function App() {
  return (
    <ProveedordeUsuario>
      <Router>
        <Rutas>
          <Ruta path="/" element={<Bienvenida />}></Ruta>
          <Ruta path='/registro' element={<Registro />}></Ruta>
          <Ruta path='/iniciodesesion' element={<IniciodeSesion />}></Ruta>
          <Ruta path='/inicio' element={<Inicio />}></Ruta>
          <Ruta path='/mapa' element={<Mapa />}></Ruta>
          <Ruta path='/basededatos' element={<BasedeDatos />}></Ruta>
          <Ruta path='/vehiculos' element={<Vehiculos />}></Ruta>
          <Ruta path='/negocios' element={<Negocios />}></Ruta>
          <Ruta path='/usuario' element={<Usuario />}></Ruta>
        </Rutas>
      </Router>
    </ProveedordeUsuario>

  );
}

export default App;
