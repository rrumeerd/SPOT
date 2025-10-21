import Ingreso from "./ingreso.jsx"
import "./negocio.css"

function Ingresos({ onClose }) {
  return (
      <div className="modal-overlay" onClick={onClose}>
          <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                  <h3>GESTIONAR COLA DE ESPERA</h3>
                  <button className="cerrar-btn" onClick={onClose}>
                      ×
                  </button>
              </div>

              <div className="modal-content">
                  <div className="en-espera-section">
                      <h4>CLIENTES EN ESPERA</h4>
                    <Ingreso/>
                      <div className="en-espera-stats">
                          <span>Total en espera: <strong>3</strong></span>
                          <span>Tiempo promedio: <strong>15 min</strong></span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
export default Ingresos;