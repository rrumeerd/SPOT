import React, { useState, useEffect } from "react";
import { useUsuario } from "../../contextos/contextodeUsuario";
import './funcionales.css';

function Saludo({ estilo }) {
  const { DatosdeUsuario, TipodeUsuario } = useUsuario();
  const [vehiculoFavorito, setVehiculoFavorito] = useState(null);
  const [loading, setLoading] = useState(false);


  const cargarVehiculoFavorito = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/vehiculos/user/${DatosdeUsuario.ID_usuario}`);
      if (response.ok) {
        const vehiculos = await response.json();
        // Tomar el primer vehículo como favorito (o implementar lógica más sofisticada)
        if (vehiculos.length > 0) {
          setVehiculoFavorito(vehiculos[0]);
        }
      }
    } catch (error) {
      console.error('Error al cargar vehículo favorito:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (TipodeUsuario === 'cliente' && DatosdeUsuario?.ID_usuario) {
      cargarVehiculoFavorito();
    }
  }, [DatosdeUsuario?.ID_usuario, TipodeUsuario]);

  if (!DatosdeUsuario) {
    return null
  };

  
  const NombredeUsuario = DatosdeUsuario.Nombre || DatosdeUsuario.fullName || DatosdeUsuario.NombredeNegocio || 'Usuario';

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

      {/* Mostrar información del vehículo favorito solo para clientes */}
      {loading ? (
        <div className="info-card">
          <div className="info-icon">
            <img src="/recursos/iconos/auto.png" alt="Vehículo" />
          </div>
          <div className="info-details">
            <div className="info-title">Cargando vehículo...</div>
          </div>
        </div>
      ) : vehiculoFavorito ? (
        <div className="info-card">
          <div className="info-icon">
            <img
              src={vehiculoFavorito.Tipo_vehiculo === 'moto' ? "/recursos/iconos/moto.png" : "/recursos/iconos/auto.png"} 
              alt="Vehículo" 
            />
          </div>
          <div className="info-details">
            <div className="info-title">
              {vehiculoFavorito.Modelo}
            </div>
            <div className="info-subtitle">
              {vehiculoFavorito.Matricula}
            </div>
            <div className="info-additional">
              {vehiculoFavorito.Tipo_vehiculo?.charAt(0).toUpperCase() + vehiculoFavorito.Tipo_vehiculo?.slice(1)}
            </div>
          </div>
        </div>
      ) : (
        <div className="info-card">
          <div className="info-icon">
            <img src="/recursos/iconos/auto.png" alt="Vehículo" />
          </div>
          <div className="info-details">
            <div className="info-title">No tienes vehículos registrados</div>
            <div className="info-subtitle">Agrega tu primer vehículo</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Saludo;
