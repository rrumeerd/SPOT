import React from "react";
import { useUsuario } from "../../contextos/contextodeUsuario";
import './funcionales.css';

function Saludo({ estilo }) {
  const { DatosdeUsuario } = useUsuario();

  // Si no hay datos del usuario, no mostrar nada
  if (!DatosdeUsuario) {
    return null;
  }

  const NombredeUsuario = DatosdeUsuario.NombreCompleto || DatosdeUsuario.NombredeNegocio || 'Usuario';

  const InformaciondeVehiculo = DatosdeUsuario.InformaciondeVehiculo;

  const TipodeUsuario = DatosdeUsuario.TipodeUsuario || 'cliente';

  if (TipodeUsuario === 'negocio') {
    return (
      <div className="saludo-usuario saludo-negocio" style={estilo}>
        <div className="saludo-header negocio-header">
          <h2 className="saludo-title negocio-title">
            ¡BIENVENIDO A TU NEGOCIO!
          </h2>
          <p className="saludo-subtitle negocio-subtitle">
            Gestiona y administra tu empresa automotriz
          </p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <img src="/recursos/iconos/inicio.png" alt="Negocio" />
          </div>
          <div className="info-details">
            <div className="info-title">
              {DatosdeUsuario.NombredeNegocio || 'Mi Negocio'}
            </div>
            <div className="info-subtitle">
              {DatosdeUsuario.TipodeServicio || 'Servicio Automotriz'}
            </div>
            <div className="info-additional">
              {DatosdeUsuario.nit && `NIT: ${DatosdeUsuario.nit}`}
              {DatosdeUsuario.direccion && ` • ${DatosdeUsuario.direccion}`}
              {DatosdeUsuario.phone && ` • ${DatosdeUsuario.telefono}`}
            </div>
          </div>
          
        </div>
      </div>
    );
  }

  // Versión para clientes
  return (
    <div className="saludo-usuario" style={estilo}>
      <div className="saludo-header">
        <h2 className="saludo-title">
          ¡Hola, {NombredeUsuario}!
        </h2>
        <p className="saludo-subtitle">
          Bienvenido de vuelta a SPOT!
        </p>
      </div>

      {/* Mostrar información del vehículo solo para clientes */}
      {InformaciondeVehiculo && (
        <div className="info-card">
          <div className="info-icon">
            <img
              src={InformaciondeVehiculo.tipo === 'moto' ? "/recursos/iconos/moto.png" : "/recursos/iconos/auto.png"} alt="Vehículo" />
          </div>
          <div className="info-details">
            <div className="info-title">
              {InformaciondeVehiculo.marca} {InformaciondeVehiculo.modelo}
            </div>
            <div className="info-subtitle">
              {InformaciondeVehiculo.placa}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Saludo;
