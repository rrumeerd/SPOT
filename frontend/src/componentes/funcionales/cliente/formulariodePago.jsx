
const { TipodeUsuario } = useUsuario();
const [showModaldeTransaccion, setShowModaldeTransaccion] = useState(false);
const [showModaldeIngreso, setShowModaldeIngreso] = useState(false);

const BotondeTransaccion = () => {
    if (TipodeUsuario === 'cliente') {
        setShowModaldeTransaccion(true);
    } else if (TipodeUsuario === 'negocio') {
        setShowModaldeIngreso(true);
    }
};

<div className="TEMPORAL-transaccion">
{showModaldeTransaccion && (
        <div className="modal-overlay" onClick={() => setShowModaldeTransaccion(false)}>
            <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>REALIZAR TRANSACCIÓN</h3>
                    <button
                        className="cerrar-btn"
                        onClick={() => setShowModaldeTransaccion(false)}
                    >
                        ×
                    </button>
                </div>

                <div className="modal-content">
                    <div className="negocio-type-row">
                        <select defaultValue="">
                            <option value="">TIPO DE TRANSACCIÓN</option>
                             <option value="transferir">Transferir dinero</option>
                            <option value="pago">Pagar servicio</option>
                            <option value="recargar">Recargar saldo</option>
                        </select>
                    </div>

                    <input
                        type="text"
                        placeholder="MONTO"
                    />

                    <input
                        type="text"
                        placeholder="DESTINATARIO"
                    />

                    <input
                        type="text"
                        placeholder="DESCRIPCIÓN"
                    />

                    <div className="modal-acciones">
                        <button
                            type="button"
                            className="guardar-btn"
                            onClick={() => setShowModaldeTransaccion(false)}
                        >
                            REALIZAR TRANSACCIÓN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )}
</div>