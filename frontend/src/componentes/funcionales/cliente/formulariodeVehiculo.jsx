import { useState, useEffect } from "react";
import { useUsuario } from "../../../contextos/contextodeUsuario.jsx";
import getBackendUrl from "../../../utils/backendUrl.js";
import './cliente.css';

function FormulariodeVehiculo({ onClose, vehiculoEdit = null, onSave, onDelete = null, isRegistration = false, vehiculoData = null }) {
  const { DatosdeUsuario } = useUsuario();
  const [datosdeFormulario, setdatosdeFormulario] = useState({
    alias: "",
    marca: "",
    modelo: "",
    ano: "",
    placa: "",
    tipo: "carro"
  });
  const [loading, setLoading] = useState(false);

  // Si se pasa un vehículo para editar, cargar sus datos
  useEffect(() => {
    if (vehiculoEdit) {
      // Extraer marca y modelo del campo Modelo
      const modeloCompleto = vehiculoEdit.Modelo || '';
      const partes = modeloCompleto.split(' ');
      const brand = partes[0] || '';
      const model = partes.slice(1).join(' ') || '';
      
      // Extraer año del historial si está disponible
      const historial = vehiculoEdit.Historial_cliente || '';
      const yearMatch = historial.match(/(\d{4})/);
      const year = yearMatch ? yearMatch[1] : '';
      
      // Extraer alias del historial
      const aliasMatch = historial.match(/^([^-]+)/);
      const alias = aliasMatch ? aliasMatch[1].trim() : '';

      setdatosdeFormulario({ 
        alias: alias,
        marca: brand, 
        modelo: model, 
        ano: year, 
        placa: vehiculoEdit.Matricula || '',
        tipo: vehiculoEdit.Tipo_vehiculo || 'carro'
      });
    } else if (isRegistration && vehiculoData) {
      // Para el caso de registro, usar los datos pasados
      setdatosdeFormulario({
        alias: vehiculoData.alias || '',
        marca: vehiculoData.brand || '',
        modelo: vehiculoData.model || '',
        ano: vehiculoData.year || '',
        placa: vehiculoData.plate || '',
        tipo: vehiculoData.type || 'carro'
      });
    } else {
      // Resetear formulario para nuevo vehículo
      setdatosdeFormulario({
        alias: "",
        marca: "",
        modelo: "",
        ano: "",
        placa: "",
        tipo: "carro"
      });
    }
  }, [vehiculoEdit, isRegistration, vehiculoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'placa') {
      const tipodeVehiculo = datosdeFormulario.tipo;
      const esMoto = tipodeVehiculo === 'moto';
      const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '');
      let formattedValue = '';

      if (esMoto) {
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

      setdatosdeFormulario((prev) => ({ ...prev, placa: formattedValue.toUpperCase() }));
      return;
    }

    setdatosdeFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datosdeFormulario.placa.trim()) return;

    setLoading(true);
    try {
      if (isRegistration) {
        // Para el caso de registro, solo pasar los datos sin hacer petición HTTP
        const vehiculoData = {
          alias: datosdeFormulario.alias,
          brand: datosdeFormulario.marca,
          model: datosdeFormulario.modelo,
          year: datosdeFormulario.ano,
          plate: datosdeFormulario.placa,
          type: datosdeFormulario.tipo
        };
        onSave && onSave(vehiculoData);
        onClose();
      } else if (vehiculoEdit) {
        // Actualizar vehículo existente
        const response = await fetch(`${getBackendUrl()}/vehiculos/${vehiculoEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Modelo: `${datosdeFormulario.marca} ${datosdeFormulario.modelo}`,
            Tipo_vehiculo: datosdeFormulario.tipo,
            year: datosdeFormulario.ano,
            Matricula: datosdeFormulario.placa,
          }),
        });

        if (response.ok) {
          onSave && onSave();
          onClose();
        } else {
          console.error('Error al actualizar vehículo');
        }
      } else {
        // Crear nuevo vehículo
        const response = await fetch(`${getBackendUrl()}/vehiculos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID_usuario: DatosdeUsuario.ID_usuario,
            Matricula: datosdeFormulario.placa,
            Modelo: `${datosdeFormulario.marca} ${datosdeFormulario.modelo}`,
            Tipo_vehiculo: datosdeFormulario.tipo,
            year: datosdeFormulario.ano
          }),
        });

        if (response.ok) {
          onSave && onSave();
          onClose();
        } else {
          console.error('Error al crear vehículo');
        }
      }
    } catch (error) {
      console.error('Error al guardar vehículo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!vehiculoEdit || !onDelete) return;
    
    const confirmed = window.confirm('¿Seguro que deseas eliminar este vehículo?');
    if (!confirmed) return;
    
    try {
      const response = await fetch(`${getBackendUrl()}/vehiculos/${vehiculoEdit.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete();
        onClose();
      } else {
        console.error('Error al eliminar vehículo');
      }
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>INFORMACIÓN DE TU VEHÍCULO</h3>
          <button className="cerrar-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="ALIAS (opcional)"
              name="alias"
              value={datosdeFormulario.alias}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="MARCA"
              name="marca"
              value={datosdeFormulario.marca}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="MODELO"
              name="modelo"
              value={datosdeFormulario.modelo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="AÑO"
              name="ano"
              value={datosdeFormulario.ano}
              onChange={handleChange}
            />
            <div className="tipo-row">
              <label>SELECCIONE EL TIPO DE VEHÍCULO</label>
              <select name="tipo" value={datosdeFormulario.tipo} onChange={handleChange}>
                <option value="carro">Carro</option>
                <option value="moto">Moto</option>
                <option value="camioneta">Camioneta</option>
                <option value="camión">Camión</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="PLACA"
              name="placa"
              value={datosdeFormulario.placa}
              onChange={handleChange}
              required
            />
            <div className="modal-actions">
              <button type="submit" className="guardar-btn" disabled={loading}>
                {loading ? 'GUARDANDO...' : 'GUARDAR'}
              </button>
              {vehiculoEdit && onDelete && !isRegistration && (
                <button type="button" className="cancelar-btn" onClick={handleDelete}>
                  ELIMINAR
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormulariodeVehiculo;
