import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contextos/contextodeUsuario.jsx";
import { useState } from "react";
import Logotipo from "../componentes/visuales/logotipo.jsx";
import Volver from "../componentes/funcionales/botones/volver.jsx";
import getBackendUrl from "../utils/backendUrl.js";
import './pantallas.css';

function IniciodeSesion() {
  const navigate = useNavigate();
  const { updateTipodeUsuario, updateDatosdeUsuario } = useUsuario();
  const [DatosdeFormulario, setDatosdeFormulario] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleCambiodeFormulario = (field, value) => {
    setDatosdeFormulario(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar mensaje de error cuando el usuario empiece a escribir
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleEnviar = async (e) => {
    e.preventDefault();

    // Limpiar mensaje de error anterior
    setErrorMessage('');

    try {
      const response = await fetch(`${getBackendUrl()}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          Correo: DatosdeFormulario.email, 
          Contrasena: DatosdeFormulario.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'correo_no_existe' || errorData.error === 'contraseña_incorrecta') {
          setErrorMessage(errorData.mensaje);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Actualizar el contexto con los datos del usuario
      const DatosdeUsuario = {
        ID_usuario: data.usuario.ID_usuario,
        email: data.usuario.Correo,
        Nombre: data.usuario.Nombre,
        TipodeUsuario: 'cliente',
        loginDate: new Date().toISOString()
      };

      updateDatosdeUsuario(DatosdeUsuario);
      updateTipodeUsuario('cliente');
      
      console.log('Login exitoso:', data);
      navigate('/inicio');
    } catch (error) {
      console.error('Error en login:', error);
      setErrorMessage('Error de conexión. Intenta nuevamente.');
    }
  };

  return (
    <div className="inicio-de-sesion-container">
      <header className="inicio-de-sesion-header">
        <Volver />
        <Logotipo />
      </header>
      <h1 className="inicio-de-sesion-title">¡INICIA SESIÓN EN TU CUENTA!</h1>

      <form className="inicio-de-sesion-form" onSubmit={handleEnviar}>
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
        
        {errorMessage && (
          <div className="error-message" style={{ color: '#ff0045', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {errorMessage}
          </div>
        )}
        
        <button type="submit" className="inicio-de-sesion-btn">INICIAR SESIÓN</button>
      </form>
    </div>
  );
}

export default IniciodeSesion;