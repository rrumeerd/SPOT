import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../contextos/contextodeUsuario";
import { useState } from "react";
import Logotipo from "../../componentes/visuales/logotipo";
import FormulariodeVehiculo from "../../componentes/funcionales/cliente/formulariodeVehiculo";
import getBackendUrl from "../../utils/backendUrl.js";
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
    type: 'carro'
  });

  const handleCambiodeFormulario = (field, value) => {
    setDatosdeFormulario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCloseModalVehiculo = () => {
    setShowModaldeVehiculo(false);
  };

  const handleSaveVehiculo = (vehiculoData) => {
    setInformaciondeVehiculo(vehiculoData);
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
      const response = await fetch(`${getBackendUrl()}/usuarios`, {
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
          const vehiculoResponse = await fetch(`${getBackendUrl()}/vehiculos`, {
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

      {showModaldeVehiculo && (
        <FormulariodeVehiculo
          onClose={handleCloseModalVehiculo}
          onSave={handleSaveVehiculo}
          isRegistration={true}
          vehiculoData={InformaciondeVehiculo}
        />
      )}
    </div >
  );
}

export default RegistrodeCliente;
