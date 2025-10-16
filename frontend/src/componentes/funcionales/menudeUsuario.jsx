import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useUsuario } from "../../contextos/contextodeUsuario";
import './funcionales.css';


function MenudeUsuario() {
  const navigate = useNavigate();
  const [EstaAbierto, setEstaAbierto] = useState(false);
  const { TipodeUsuario, DatosdeUsuario, clearUsuario } = useUsuario();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setEstaAbierto(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleEstado = () => {
    setEstaAbierto(!EstaAbierto);
  };

  const handleCerrarSesion = () => {
    clearUsuario();
    setEstaAbierto(false);
  };

  return (
    <div className="menu-de-usuario-container" ref={menuRef}>
      <button 
        className="menu-de-usuario-btn"
        onClick={toggleEstado}
        aria-label="Menú de usuario"
      >
        <img src="/recursos/iconos/usuario.png" alt="Usuario"/>
      </button>

      {EstaAbierto && (
        <div className="menu-de-usuario-dropdown">
          <div className="menu-de-usuario-header">
            <div className="usuario-avatar">
              <img src="/recursos/iconos/usuario.png" alt="Avatar"/>
            </div>
            <div className="usuario-info">
              <div className="usuario-nombre">
                {DatosdeUsuario?.Nombre || DatosdeUsuario?.fullName || 
                 (TipodeUsuario === 'negocio' ? 'Mi Negocio' : 'Usuario')}
              </div>
              <div className="tipo-de-usuario">
                {TipodeUsuario === 'negocio' ? 'Cuenta empresarial' : 'Cuenta personal'}
              </div>
            </div>
          </div>

          <div className="menu-de-usuario-options">
            <button className="menu-de-usuario-option" onClick={() => navigate('/perfil')}>
              <img src="/recursos/iconos/usuario.png" alt="Perfil"/>
              <span>Mi Perfil</span>
            </button>
            <button className="menu-de-usuario-option" onClick={() => navigate('/configuracion')}>
              <img src="/recursos/iconos/mas.png" alt="Configuración"/>
              <span>Configuración</span>
            </button>
            
            <button className="menu-de-usuario-option" onClick={() => navigate('/soporte')}>
              <img src="/recursos/iconos/continuar.png" alt="Soporte"/>
              <span>Ayuda y Soporte</span>
            </button>
          </div>

          <div className="menu-de-usuario-divider"></div>
          
          <button className="menu-de-usuario-option cerrar-sesion-option" onClick={handleCerrarSesion}>
            <img src="/recursos/iconos/usuario.png" alt="Cerrar sesión"/>
            <span><b>Cerrar Sesión</b></span>
          </button>
        </div>
      )}
    </div>
  );
}

export default MenudeUsuario;