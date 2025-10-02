import "./negocio.css"

function Ingresos() {
        return (
    <div className="modal-overlay">
        <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
                <h3>GESTIONAR COLA DE ESPERA</h3>
                <button className="cerrar-btn">
                </button>
            </div>

            <div className="modal-content">
                <div className="en-espera-section">
                    <h4>CLIENTES EN ESPERA</h4>

                    <div className="en-espera-element">
                        <div className="cliente-info">
                            <div>Carlos Mendoza</div>
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

                    <div className="en-espera-stats">
                        <span>Total en espera: <strong>3</strong></span>
                        <span>Tiempo promedio: <strong>15 min</strong></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )}
export default Ingresos;