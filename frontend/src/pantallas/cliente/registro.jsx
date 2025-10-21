import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario";
import { useState } from "react";
import Logotipo from "../../componentes/visuales/logotipo";
import './cliente.css';

function RegistrodeCliente() {
  const navigate = useNavigate();
  const { updateTipodeUsuario, updateDatosdeUsuario } = useUsuario();
  const [showModaldeVehiculo, setShowModaldeVehiculo] = useState(false);
  const [DatosdeFormulario, setDatosdeFormulario] = useState({
    fullName: '',
    documentNumber: '',
    documentType: 'C.C.',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [InformaciondeVehiculo, setInformaciondeVehiculo] = useState({
    alias: '',
    brand: '',
    model: '',
    year: '',
    plate: '',
    type: ''
  });

  const handleCambiodeFormulario = (field, value) => {
    setDatosdeFormulario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCambiarInformaciondeVehiculo = (field, value) => {
    if (field === 'plate') {
      // Limpiar caracteres especiales y mantener solo letras y números
      const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '');

      // Determinar el tipo de vehículo para validar la estructura
      const vehicleType = InformaciondeVehiculo.type;
      const isMotorcycle = vehicleType === 'moto';

      let formattedValue = '';

      if (isMotorcycle) {
        // Para motos: 3 letras + 2 números + 1 letra (ABC-12D)
        let limitedValue = cleanValue.slice(0, 6);

        // Validar que los primeros 3 sean letras
        let letters = limitedValue.slice(0, 3).replace(/[^a-zA-Z]/g, '');
        letters = letters.slice(0, 3);

        // Validar que los siguientes 2 sean números
        let numbers = limitedValue.slice(3, 5).replace(/[^0-9]/g, '');
        numbers = numbers.slice(0, 2);

        // Validar que el último sea letra
        let lastChar = limitedValue.slice(5, 6).replace(/[^a-zA-Z]/g, '');
        lastChar = lastChar.slice(0, 1);

        const combined = letters + numbers + lastChar;

        if (combined.length > 3) {
          formattedValue = `${combined.slice(0, 3)}-${combined.slice(3)}`;
        } else {
          formattedValue = combined;
        }
      } else {
        // Para vehículos grandes: 3 letras + 3 números (ABC-123)
        let limitedValue = cleanValue.slice(0, 6);

        // Validar que los primeros 3 sean letras
        let letters = limitedValue.slice(0, 3).replace(/[^a-zA-Z]/g, '');
        letters = letters.slice(0, 3);

        // Validar que los siguientes 3 sean números
        let numbers = limitedValue.slice(3, 6).replace(/[^0-9]/g, '');
        numbers = numbers.slice(0, 3);

        const combined = letters + numbers;

        if (combined.length > 3) {
          formattedValue = `${combined.slice(0, 3)}-${combined.slice(3)}`;
        } else {
          formattedValue = combined;
        }
      }

      setInformaciondeVehiculo(prev => ({
        ...prev,
        [field]: formattedValue
      }));
    } else {
      setInformaciondeVehiculo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleGuardarInformaciondeVehiculo = () => {
    setShowModaldeVehiculo(false);
  };

  const handleEnviar = async (e) => {
    e.preventDefault();

    if (DatosdeFormulario.password !== DatosdeFormulario.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Crear objeto con los datos del usuario
    const DatosdeUsuario = {
      fullName: DatosdeFormulario.fullName,
      documentNumber: DatosdeFormulario.documentNumber,
      documentType: DatosdeFormulario.documentType,
      email: DatosdeFormulario.email,
      InformaciondeVehiculo: InformaciondeVehiculo,
      TipodeUsuario: 'cliente',
      FechadeRegistro: new Date().toISOString()
    };
    
    updateDatosdeUsuario(DatosdeUsuario);
    updateTipodeUsuario('cliente');
    try {
      const response = await fetch('http://localhost:4000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          Nombre: DatosdeFormulario.fullName,
          Documento: DatosdeFormulario.documentNumber,
          Tipo_identificacion: DatosdeFormulario.documentType,
          Correo: DatosdeFormulario.email,
          Telefono: DatosdeFormulario.telefono,
          InformaciondeVehiculo: InformaciondeVehiculo,
          Tipo_usuario: 'cliente',
          Contrasena: DatosdeFormulario.password,
        }),
      });

      if (!response.ok) {
        navigate('/registro')
        throw new Error(`HTTP error! status: ${response.status}`);
        
      }

      const data = await response.json();
      console.log('Usuario creado:', data);
      
      // Ahora registrar el vehículo en la base de datos
      if (InformaciondeVehiculo.brand && InformaciondeVehiculo.plate) {
        try {
          const vehiculoResponse = await fetch('http://localhost:4000/vehiculos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
              ID_usuario: data.userID,
              Matricula: InformaciondeVehiculo.plate,
              Modelo: `${InformaciondeVehiculo.brand} ${InformaciondeVehiculo.model}`,
              Tipo_vehiculo: InformaciondeVehiculo.type,
              Historial_cliente: `${InformaciondeVehiculo.alias || 'Sin alias'} - ${InformaciondeVehiculo.year}`
            }),
          });

          if (vehiculoResponse.ok) {
            const vehiculoData = await vehiculoResponse.json();
            console.log('Vehículo registrado:', vehiculoData);
          } else {
            console.error('Error al registrar vehículo');
          }
        } catch (vehiculoError) {
          console.error('Error al registrar vehículo:', vehiculoError);
        }
      }
      
      navigate('/inicio');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error')
      navigate('/registro')
    }

    
  };

  const getInformaciondeVehiculoDisplay = () => {
    if (InformaciondeVehiculo.brand) {
      const modelText = InformaciondeVehiculo.model ? ` ${InformaciondeVehiculo.model}` : '';
      const plateText = InformaciondeVehiculo.plate ? ` ${InformaciondeVehiculo.plate.toUpperCase()}` : '';
      const typeText = InformaciondeVehiculo.type ? ` (${InformaciondeVehiculo.type.charAt(0).toUpperCase() + InformaciondeVehiculo.type.slice(1)})` : '';
      return `${InformaciondeVehiculo.brand}${modelText}${plateText}${typeText}`;
    }
    return '';
  };

  return (
    <div className="registro-container">
      <header className="registro-header">
        <button className="volver-btn" onClick={() => navigate('/')}>{<img src="/recursos/iconos/volver.png" alt="" />} VOLVER</button>
        <Logotipo />
      </header>
      <h1 className="registro-title">¡REGISTRATE COMO CLIENTE!</h1>

      <form className="registro-form" onSubmit={handleEnviar}>
        <div className="form-group">
          <input
            type="text"
            placeholder="NOMBRES Y APELLIDOS"
            value={DatosdeFormulario.fullName}
            onChange={(e) => handleCambiodeFormulario('fullName', e.target.value)}
            required
          />
          <div className="id-row">
            <input
              type="number"
              placeholder="IDENTIFICACIÓN"
              value={DatosdeFormulario.documentNumber}
              onChange={(e) => handleCambiodeFormulario('documentNumber', e.target.value)}
              min="1000000"
              max="1999999999"
              required
            />
            <select
              className="tipo-de-documento-select"
              value={DatosdeFormulario.documentType}
              onChange={(e) => handleCambiodeFormulario('documentType', e.target.value)}
            >
              <option value="C.C.">C.C.</option>
              <option value="C.E.">C.E.</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="TELÉFONO"
            value={DatosdeFormulario.telefono}
            onChange={(e) => handleCambiodeFormulario('telefono', e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            value={DatosdeFormulario.email}
            onChange={(e) => handleCambiodeFormulario('email', e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
          <input
            type="password"
            placeholder="CONTRASEÑA"
            value={DatosdeFormulario.password}
            onChange={(e) => handleCambiodeFormulario('password', e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="REPITE TU CONTRASEÑA"
            value={DatosdeFormulario.confirmPassword}
            onChange={(e) => handleCambiodeFormulario('confirmPassword', e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="VEHÍCULO Y MATRÍCULA"
            value={getInformaciondeVehiculoDisplay()}
            readOnly
            onClick={() => setShowModaldeVehiculo(true)}
            style={{ cursor: 'pointer' }}
          />
          <button type="submit" className="registro-btn">
            REGISTRO
          </button>
        </div>
      </form>

      {/* Modal para información del vehículo */}
      {showModaldeVehiculo && (
        <div className="modal-overlay" onClick={() => setShowModaldeVehiculo(false)}>
          <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>INFORMACIÓN DE TU VEHÍCULO</h3>
              <button
                className="cerrar-btn"
                onClick={() => setShowModaldeVehiculo(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <input
                type="text"
                placeholder="ALIAS (opcional)"
                value={InformaciondeVehiculo.alias}
                onChange={(e) => handleCambiarInformaciondeVehiculo('alias', e.target.value)}
              />
              <input
                type="text"
                placeholder="MARCA"
                value={InformaciondeVehiculo.brand}
                onChange={(e) => handleCambiarInformaciondeVehiculo('brand', e.target.value)}
              />
              <input
                type="text"
                placeholder="MODELO"
                value={InformaciondeVehiculo.model}
                onChange={(e) => handleCambiarInformaciondeVehiculo('model', e.target.value)}
              />
              <input
                type="text"
                placeholder="AÑO"
                value={InformaciondeVehiculo.year}
                onChange={(e) => handleCambiarInformaciondeVehiculo('year', e.target.value)}
              />
              <input
                type="text"
                placeholder="PLACA"
                value={InformaciondeVehiculo.plate}
                onChange={(e) => handleCambiarInformaciondeVehiculo('plate', e.target.value)}
              />
              SELECCIONE EL TIPO DE VEHÍCULO
              <div className="tipo-row">
                <select
                  value={InformaciondeVehiculo.type}
                  onChange={(e) => handleCambiarInformaciondeVehiculo('type', e.target.value)}
                >
                  <option value="carro">Carro</option>
                  <option value="moto">Moto</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="camión">Camión</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="guardar-btn"
                  onClick={handleGuardarInformaciondeVehiculo}
                >
                  GUARDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}

export default RegistrodeCliente;
