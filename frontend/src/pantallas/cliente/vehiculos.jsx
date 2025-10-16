import Logotipo from "../../componentes/visuales/logotipo.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import { useState, useEffect } from "react";
import { useUsuario } from "../../contextos/contextodeUsuario";
import './cliente.css';

function Vehiculos() {
  const { DatosdeUsuario } = useUsuario();
  const [vehiculos, setVehiculos] = useState([]);
  const [formData, setFormData] = useState({
    type: "carro",
    brand: "",
    model: "",
    year: "",
    plate: "",
    color: "",
    alias: "",
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar vehículos del usuario desde la base de datos
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Formateo especial para la placa según el tipo (alineado con registro.jsx)
    if (name === 'plate') {
      const vehicleType = formData.type;
      const isMotorcycle = vehicleType === 'moto';
      const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '');
      let formattedValue = '';

      if (isMotorcycle) {
        let limitedValue = cleanValue.slice(0, 6);
        let letters = limitedValue.slice(0, 3).replace(/[^a-zA-Z]/g, '').slice(0, 3);
        let numbers = limitedValue.slice(3, 5).replace(/[^0-9]/g, '').slice(0, 2);
        let lastChar = limitedValue.slice(5, 6).replace(/[^a-zA-Z]/g, '').slice(0, 1);
        const combined = letters + numbers + lastChar;
        formattedValue = combined.length > 3 ? `${combined.slice(0, 3)}-${combined.slice(3)}` : combined;
      } else {
        let limitedValue = cleanValue.slice(0, 6);
        let letters = limitedValue.slice(0, 3).replace(/[^a-zA-Z]/g, '').slice(0, 3);
        let numbers = limitedValue.slice(3, 6).replace(/[^0-9]/g, '').slice(0, 3);
        const combined = letters + numbers;
        formattedValue = combined.length > 3 ? `${combined.slice(0, 3)}-${combined.slice(3)}` : combined;
      }

      setFormData((prev) => ({ ...prev, plate: formattedValue.toUpperCase() }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ type: "carro", brand: "", model: "", year: "", plate: "", color: "", alias: "" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.plate.trim()) return;

    try {
      if (editId !== null) {
        // Actualizar vehículo existente
        const response = await fetch(`http://localhost:4000/vehiculos/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Modelo: `${formData.brand} ${formData.model}`,
            Tipo_vehiculo: formData.type,
            Historial_cliente: `${formData.alias || 'Sin alias'} - ${formData.year}`
          }),
        });

        if (response.ok) {
          await cargarVehiculos(); // Recargar la lista
        } else {
          console.error('Error al actualizar vehículo');
        }
      } else {
        // Crear nuevo vehículo
        const response = await fetch('http://localhost:4000/vehiculos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID_usuario: DatosdeUsuario.ID_usuario,
            Matricula: formData.plate,
            Modelo: `${formData.brand} ${formData.model}`,
            Tipo_vehiculo: formData.type,
            Historial_cliente: `${formData.alias || 'Sin alias'} - ${formData.year}`
          }),
        });

        if (response.ok) {
          await cargarVehiculos(); // Recargar la lista
        } else {
          console.error('Error al crear vehículo');
        }
      }
      
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar vehículo:', error);
    }
  };

  const handleEdit = (vehiculo) => {
    // Extraer marca y modelo del campo Modelo
    const modeloCompleto = vehiculo.Modelo || '';
    const partes = modeloCompleto.split(' ');
    const brand = partes[0] || '';
    const model = partes.slice(1).join(' ') || '';
    
    // Extraer año del historial si está disponible
    const historial = vehiculo.Historial_cliente || '';
    const yearMatch = historial.match(/(\d{4})/);
    const year = yearMatch ? yearMatch[1] : '';
    
    // Extraer alias del historial
    const aliasMatch = historial.match(/^([^-]+)/);
    const alias = aliasMatch ? aliasMatch[1].trim() : '';

    setFormData({ 
      type: vehiculo.Tipo_vehiculo || 'carro', 
      brand: brand, 
      model: model, 
      year: year, 
      plate: vehiculo.Matricula || '', 
      color: '', 
      alias: alias 
    });
    setEditId(vehiculo.ID_vehiculo);
    setShowModal(true);
  };

  const handleDeleteInModal = async () => {
    if (editId === null) return;
    const confirmed = window.confirm('¿Seguro que deseas eliminar este vehículo?');
    if (!confirmed) return;
    
    try {
      const response = await fetch(`http://localhost:4000/vehiculos/${editId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await cargarVehiculos(); // Recargar la lista
      } else {
        console.error('Error al eliminar vehículo');
      }
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
    }
    
    resetForm();
    setShowModal(false);
  };

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
          onClick={() => { setShowModal(true); setEditId(null); }}
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
                <div key={v.ID_vehiculo} className="vehiculos-card">
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
                    <div className="vehiculos-card-row"><span>Año:</span> <strong>{year}</strong></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>INFORMACIÓN DE TU VEHÍCULO</h3>
              <button className="cerrar-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <input
                type="text"
                placeholder="ALIAS (opcional)"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="MARCA"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="MODELO"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="AÑO"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="PLACA"
                name="plate"
                value={formData.plate}
                onChange={handleChange}
              />
              SELECCIONE EL TIPO DE VEHÍCULO
              <div className="tipo-row">
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="carro">Carro</option>
                  <option value="moto">Moto</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="camión">Camión</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="guardar-btn" onClick={handleSubmit}>GUARDAR</button>
                {editId !== null && (
                  <button type="button" className="cancelar-btn" onClick={handleDeleteInModal}>ELIMINAR</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <MenuInferior />
    </div>
  );
}

export default Vehiculos;