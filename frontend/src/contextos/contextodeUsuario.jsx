import { createContext, useContext, useState, useEffect } from 'react';

const ContextodeUsuario = createContext();

export function ProveedordeUsuario({ children }) {
    const [TipodeUsuario, setTipodeUsuario] = useState(null);
    const [DatosdeUsuario, setDatosdeUsuario] = useState(null);

    useEffect(() => {
        const TipodeUsuarioAlmacenado = localStorage.getItem('TipodeUsuario');
        const DatosdeUsuarioAlmacenados = localStorage.getItem('DatosdeUsuario');

        if (TipodeUsuarioAlmacenado) {
            setTipodeUsuario(TipodeUsuarioAlmacenado);
        }

        if (DatosdeUsuarioAlmacenados) {
            try {
                setDatosdeUsuario(JSON.parse(DatosdeUsuarioAlmacenados));
            } catch (error) {
                console.error('Error al analizar los datos del usuario:', error);
            }
        }
    }, []);

    const updateTipodeUsuario = (tipo) => {
        setTipodeUsuario(tipo);
        localStorage.setItem('TipodeUsuario', tipo);
    };
  
    const updateDatosdeUsuario = (datos) => {
      setDatosdeUsuario(datos);
      localStorage.setItem('DatosdeUsuario', JSON.stringify(datos));
    };
  
    const clearUsuario = () => {
      setTipodeUsuario(null);
      setDatosdeUsuario(null);
      localStorage.removeItem('TipodeUsuario');
      localStorage.removeItem('DatosdeUsuario');
    };
  
    return (
      <ContextodeUsuario.Provider value={{ 
        TipodeUsuario, 
        DatosdeUsuario, 
        updateTipodeUsuario, 
        updateDatosdeUsuario, 
        clearUsuario 
      }}>
        {children}
      </ContextodeUsuario.Provider>
    );
  }
  
  export const useUsuario = () => {
    const contexto = useContext(ContextodeUsuario);
    if (!contexto) {
      throw new Error('useUsuario debe ser usado en un ProveedordeUsuario.');
    }
    return contexto;
  };
  