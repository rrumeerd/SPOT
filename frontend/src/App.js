import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Rutas, Route as Ruta } from 'react-router-dom';
import { ProveedordeUsuario } from './contextos/contextodeUsuario';
import Bienvenida from './pantallas/bienvenida';
import IniciodeSesion from './pantallas/iniciodeSesion';

/* CLiente */
import Mapa from './pantallas/cliente/mapa';
import Vehiculos from './pantallas/cliente/vehiculos';

/* Compartidas */
import Registro from './pantallas/compartidas/registro';
import Inicio from './pantallas/compartidas/inicio';
import Perfil from './pantallas/compartidas/perfil';
import Configuracion from './pantallas/configuracion';
import Soporte from './pantallas/soporte';


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
          <Ruta path='/perfil' element={<Perfil />}></Ruta>
          <Ruta path='/configuracion' element={<Configuracion />}></Ruta>
          <Ruta path='/soporte' element={<Soporte />}></Ruta>
        </Rutas>
      </Router>
    </ProveedordeUsuario>

  );
}

export default App;
