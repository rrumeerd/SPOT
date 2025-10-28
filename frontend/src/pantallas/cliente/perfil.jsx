import Logotipo from "../../componentes/visuales/logotipo.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import { useState, useEffect } from "react";
import getBackendUrl from "../../utils/backendUrl.js";
import './cliente.css';

function PerfildeCliente() {
  const { DatosdeUsuario } = useUsuario();
  const [vehiculoFavorito, setVehiculoFavorito] = useState(null);
  const [loading, setLoading] = useState(true);

  const nombreUsuario = DatosdeUsuario?.Nombre || DatosdeUsuario?.fullName || 'Usuario';

  useEffect(() => {
    if (DatosdeUsuario?.ID_usuario) {
      cargarVehiculoFavorito();
    }
  }, [DatosdeUsuario?.ID_usuario]);

  const cargarVehiculoFavorito = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getBackendUrl()}/vehiculos/user/${DatosdeUsuario.ID_usuario}`);
      if (response.ok) {
        const vehiculos = await response.json();
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

  const vehiculoFav = (() => {
    if (loading) return 'Cargando...';
    if (!vehiculoFavorito) return 'Sin vehículo registrado';
    return `${vehiculoFavorito.marca} ${vehiculoFavorito.Modelo} - ${vehiculoFavorito.Matricula}`;
  })();
  return (
    <div className="usuario-container">
      <div className="usuario-header">
        <Logotipo />
        <MenudeUsuario />
      </div>
      <div className="usuario-content">
        <h1 className="usuario-title">PERFIL DE USUARIO</h1>
        <div className="perfil-header">
          <div className="perfil-cover"></div>
          <div className="perfil-avatar">
            <img src="/recursos/iconos/usuario.png" alt="Avatar" />
          </div>
        </div>
        <p className="usuario-description">
          {nombreUsuario} • Vehículo favorito: {vehiculoFav}
        </p>

        <div className="perfil-actions">
          <button className="perfil-edit-btn">
            <img src="/recursos/iconos/editar.png" alt="Editar" />
            Editar perfil
          </button>
        </div>

        <section className="perfil-section">
          <div className="perfil-section-title">
            <img src="/recursos/iconos/pago.png" alt="Pagos" />
            Historial de pagos
          </div>
          <div className="perfil-list">
            <div className="perfil-list-item">
              <span>#12345</span>
              <span>$ 15.000</span>
              <span>12/09/2025</span>
            </div>
            <div className="perfil-list-item">
              <span>#12312</span>
              <span>$ 8.500</span>
              <span>03/09/2025</span>
            </div>
          </div>
        </section>

        <section className="perfil-section">
          <div className="perfil-section-title">
            <img src="/recursos/iconos/velocidad.png" alt="Movimientos" />
            Últimos movimientos
          </div>
          <div className="perfil-list">
            <div className="perfil-list-item">
              <span>Recarga en Gasera Centro</span>
              <span>$ 10.000</span>
              <span>hace 2d</span>
            </div>
            <div className="perfil-list-item">
              <span>Servicio de estacionamiento</span>
              <span>$ 5.000</span>
              <span>hace 5d</span>
            </div>
          </div>
        </section>
      </div>
      <MenuInferior />
    </div>
  );
}

export default PerfildeCliente;