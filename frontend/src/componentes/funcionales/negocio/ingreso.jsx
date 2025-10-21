import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../../contextos/contextodeUsuario";
import { useState, useEffect } from "react";
import "./negocio.css"

function Ingreso() {
    const { DatosdeUsuario, TipodeUsuario } = useUsuario();

    useEffect(() => {
        if (TipodeUsuario === 'cliente' && DatosdeUsuario?.ID_usuario) {
      
        }
    }, [DatosdeUsuario?.ID_usuario, TipodeUsuario]);

    if (!DatosdeUsuario) {
        return null;
    }

    const NombredeUsuario = DatosdeUsuario.Nombre || DatosdeUsuario.fullName || DatosdeUsuario.NombredeNegocio || 'Usuario';
    return (
        <>
            <div className="en-espera-element">
                <div className="cliente-info">
                    <div>{NombredeUsuario}</div>
                    <div>YAMAHA NMAX 115 - POP 69X</div>
                    <div>Esperando desde: 15 min</div>
                </div>
                <div className="en-espera-actions">
                    <input
                        type="text"
                        placeholder="ESCRIBIR MOTIVO"
                        className="motivo-input"
                    />
                    <button className="asignar-btn">ASIGNAR</button>
                </div>
            </div>
        </>
    )
}

export default Ingreso