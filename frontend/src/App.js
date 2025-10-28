import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes as Rutas, Route as Ruta } from 'react-router-dom';
import { ProveedordeUsuario } from './contextos/contextodeUsuario';

/* CLiente */
import Mapa from './pantallas/cliente/mapa';
import Vehiculos from './pantallas/cliente/vehiculos';
import Movimientos from './pantallas/cliente/movimientos';

/* Compartidas */
import Registro from './pantallas/registro';
import Inicio from './pantallas/inicio';
import Perfil from './pantallas/perfil';
import Configuracion from './pantallas/configuracion';
import Soporte from './pantallas/soporte';
import Bienvenida from './pantallas/bienvenida';
import IniciodeSesion from './pantallas/iniciodeSesion';


/* Negocio */
import BasedeDatos from './pantallas/negocio/basedeDatos';

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
          <Ruta path='/movimientos' element={<Movimientos />}></Ruta>
          <Ruta path='/perfil' element={<Perfil />}></Ruta>
          <Ruta path='/configuracion' element={<Configuracion />}></Ruta>
          <Ruta path='/soporte' element={<Soporte />}></Ruta>
        </Rutas>
      </Router>
    </ProveedordeUsuario>

  );
}

export default App;
