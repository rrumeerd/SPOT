import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contextos/contextodeUsuario.jsx";
import { useState } from "react";
import Logotipo from "../componentes/visuales/logotipo.jsx";
import './pantallas.css';

function IniciodeSesion() {
  const navigate = useNavigate();
  const { updateTipodeUsuario, updateDatosdeUsuario } = useUsuario();
  const [DatosdeFormulario, setDatosdeFormulario] = useState({
    documentNumber: '',
    documentType: 'C.C.',
    email: '',
    password: ''
  });

  const handleCambiodeFormulario = (field, value) => {
    setDatosdeFormulario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEnviar = (e) => {
    e.preventDefault();


    const DatosdeUsuario = {
      documentNumber: DatosdeFormulario.documentNumber,
      documentType: DatosdeFormulario.documentType,
      email: DatosdeFormulario.email,
      TipodeUsuario: 'cliente',
      loginDate: new Date().toISOString()
    };

    updateDatosdeUsuario(DatosdeUsuario);
    updateTipodeUsuario('cliente');

    navigate('/inicio');
  };

  return (
    <div className="inicio-de-sesion-container">
      <header className="inicio-de-sesion-header">
        <button className="volver-btn" onClick={() => navigate('/')}>{<img src="/recursos/iconos/volver.png" alt="" />} VOLVER</button>
        <Logotipo />
      </header>
      <h1 className="inicio-de-sesion-title">¡INICIA SESIÓN EN TU CUENTA!</h1>

      <form className="inicio-de-sesion-form" onSubmit={handleEnviar}>
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
        <button type="submit" className="inicio-de-sesion-btn">INICIAR SESIÓN</button>
      </form>
    </div>
  );
}

export default IniciodeSesion;