import Logotipo from "../../componentes/visuales/logotipo.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import FormulariodeVehiculo from "../../componentes/funcionales/cliente/formulariodeVehiculo.jsx";
import { useState, useEffect } from "react";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import { useNavigate } from "react-router-dom";
import './cliente.css';

function Vehiculos() {
  const { DatosdeUsuario } = useUsuario();
  const [vehiculos, setVehiculos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vehiculoEdit, setVehiculoEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DatosdeUsuario?.ID_usuario) {
      cargarVehiculos();
    }
  }, [DatosdeUsuario]);

  const cargarVehiculos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/vehiculos/user/${DatosdeUsuario.ID_usuario}`);
      if (response.ok) {
        const vehiculosData = await response.json();
        setVehiculos(vehiculosData);
      } else {
        console.error('Error al cargar vehículos');
      }
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehiculo) => {
    setVehiculoEdit(vehiculo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVehiculoEdit(null);
  };

  const handleSave = async () => {
    await cargarVehiculos();
  };

  const handleDelete = async () => {
    await cargarVehiculos();
  };
  const { TipodeUsuario } = useUsuario();
  const navigate = useNavigate();

  useEffect(() => {
    if (TipodeUsuario === "negocio") navigate("/basededatos", { replace: true });
  }, [TipodeUsuario, navigate]);

  return (
    <div className="vehiculos-container">
      <div className="vehiculos-header">
        <Logotipo />
        <MenudeUsuario />
      </div>
      <div className="vehiculos-content">
        <h1 className="vehiculos-title">VEHÍCULOS</h1>

        <button
          type="button"
          className="vehiculos-add-btn"
          onClick={() => { setVehiculoEdit(null); setShowModal(true); }}
          aria-label="Agregar vehículo"
        >
          <img src="/recursos/iconos/mas.png" alt="Agregar" />
        </button>

        <div className="vehiculos-list">
          {loading ? (
            <div className="vehiculos-empty">Cargando vehículos...</div>
          ) : vehiculos.length === 0 ? (
            <div className="vehiculos-empty">No tienes vehículos registrados todavía.</div>
          ) : (
            vehiculos.map((v) => {
              // Extraer información del modelo y historial
              const modeloCompleto = v.Modelo || '';
              const partes = modeloCompleto.split(' ');
              const brand = partes[0] || '';
              const model = partes.slice(1).join(' ') || '';
              
              const historial = v.Historial_cliente || '';
              const yearMatch = historial.match(/(\d{4})/);
              const year = yearMatch ? yearMatch[1] : '';
              
              const aliasMatch = historial.match(/^([^-]+)/);
              const alias = aliasMatch ? aliasMatch[1].trim() : '';

              return (
                <div key={v.id} className="vehiculos-card">
                  <div className="vehiculos-card-top">
                    <img
                      className="vehiculos-type-icon"
                      src={
                        v.Tipo_vehiculo === 'moto' ? '/recursos/iconos/moto.png' :
                        (v.Tipo_vehiculo === 'carro' || v.Tipo_vehiculo === 'camioneta' || v.Tipo_vehiculo === 'camión') ? '/recursos/iconos/auto.png' :
                        '/recursos/iconos/auto.png'
                      }
                      alt={v.Tipo_vehiculo || 'vehículo'}
                    />
                    <button className="vehiculos-edit-icon-btn" onClick={() => handleEdit(v)} aria-label="Editar vehículo">
                      <img src="/recursos/iconos/editar.png" alt="Editar" />
                    </button>
                  </div>
                  <div className="vehiculos-card-body">
                    <div className="vehiculos-card-title">{alias || modeloCompleto}</div>
                    <div className="vehiculos-card-row"><span>Placa:</span> <strong>{v.Matricula}</strong></div>
                    <div className="vehiculos-card-row"><span>Marca:</span> <strong>{brand}</strong></div>
                    <div className="vehiculos-card-row"><span>Modelo:</span> <strong>{model}</strong></div>
                    <div className="vehiculos-card-row"><span>Año:</span> <strong>{v.year}</strong></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {showModal && (
        <FormulariodeVehiculo
          onClose={handleCloseModal}
          vehiculoEdit={vehiculoEdit}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
      <MenuInferior />
    </div>
  );
}

export default Vehiculos;