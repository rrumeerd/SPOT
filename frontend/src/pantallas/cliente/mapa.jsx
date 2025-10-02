import MenudeUsuario from "../../componentes/funcionales/menudeUsuario.jsx";
import Logotipo from "../../componentes/visuales/logotipo.jsx";
import MenuInferior from "../../componentes/funcionales/menuInferior.jsx";
import './cliente.css';

function Mapa() {

    return (
        <div className="mapa-container">
            <div className="mapa-header">
                <Logotipo />
                <MenudeUsuario />
            </div>
            <div className="mapa-title">MAPA</div>
            <div className="mapa-content">
                <div className="mapa-busqueda-container">
                    <div className="mapa-busqueda-box">
                        <button><img src="/recursos/iconos/lupa.png" alt="Buscar" /> |</button>
                        <input type="text" placeholder="Buscar" />
                    </div>
                    <div className="mapa-busqueda-favoritos">
                        <button><img src="/recursos/iconos/favoritos.png" alt="Favoritos" /></button>
                    </div>
                </div>
                <div className="mapa-mapa">
                </div>
                <div className="mapa-ubicacion-info">
                    <div className="mapa-ubicacion-info-header">
                        <div className="mapa-ubicación-nombre"></div>
                    </div>
                </div>
            </div>
            <MenuInferior />
        </div>
    );
}

export default Mapa;