import Logotipo from "../../componentes/visuales/logotipo.jsx";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import { useState } from "react";
import './cliente.css';

function Vehiculos() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plate.trim()) return;

    if (editId !== null) {
      setVehiculos((prev) => prev.map((v) => (v.id === editId ? { ...v, ...formData } : v)));
    } else {
      const nuevo = { id: Date.now(), ...formData };
      setVehiculos((prev) => [nuevo, ...prev]);
    }
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (id) => {
    const v = vehiculos.find((x) => x.id === id);
    if (!v) return;
    setFormData({ type: v.type, brand: v.brand, model: v.model, year: v.year, plate: v.plate, color: v.color, alias: v.alias });
    setEditId(id);
    setShowModal(true);
  };

  const handleDeleteInModal = () => {
    if (editId === null) return;
    const confirmed = window.confirm('¿Seguro que deseas eliminar este vehículo?');
    if (!confirmed) return;
    setVehiculos((prev) => prev.filter((v) => v.id !== editId));
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
          {vehiculos.length === 0 ? (
            <div className="vehiculos-empty">No tienes vehículos registrados todavía.</div>
          ) : (
            vehiculos.map((v) => (
              <div key={v.id} className="vehiculos-card">
                <div className="vehiculos-card-top">
                  <img
                    className="vehiculos-type-icon"
                    src={
                      v.type === 'moto' ? '/recursos/iconos/moto.png' :
                      (v.type === 'carro' || v.type === 'camioneta' || v.type === 'camión') ? '/recursos/iconos/auto.png' :
                      '/recursos/iconos/auto.png'
                    }
                    alt={v.type || 'vehículo'}
                  />
                  <button className="vehiculos-edit-icon-btn" onClick={() => handleEdit(v.id)} aria-label="Editar vehículo">
                    <img src="/recursos/iconos/editar.png" alt="Editar" />
                  </button>
                </div>
                <div className="vehiculos-card-body">
                  <div className="vehiculos-card-title">{v.alias || `${v.brand} ${v.model}`}</div>
                  <div className="vehiculos-card-row"><span>Placa:</span> <strong>{v.plate}</strong></div>
                  <div className="vehiculos-card-row"><span>Marca:</span> <strong>{v.brand}</strong></div>
                  <div className="vehiculos-card-row"><span>Modelo:</span> <strong>{v.model}</strong></div>
                  <div className="vehiculos-card-row"><span>Año:</span> <strong>{v.year}</strong></div>
                </div>
              </div>
            ))
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