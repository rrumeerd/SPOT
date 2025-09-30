import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import Logotipo from "../../componentes/visuales/logotipo.jsx";
import './cliente.css';

function Pagos() {
    return (
        <div className="pago-container">
            <header className="pago-header">
                <Logotipo />
            </header>
            <div className="pago-content">
                <h1 className="pago-title">PAGOS</h1>
                <p className="pago-description">Aquí podrás gestionar tus pagos y transacciones.</p>
            </div>
            <MenuInferior />
        </div>
    );
}

export default Pagos;
