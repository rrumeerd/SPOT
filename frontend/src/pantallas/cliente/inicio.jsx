import MenuInferior from "../../componentes/funcionales/menuInferior";
import MenudeUsuario from "../../componentes/funcionales/menudeUsuario";
import Saludo from "../../componentes/funcionales/saludo";
import Logotipo from "../../componentes/visuales/logotipo";
import { useNavigate } from 'react-router-dom';
import './cliente.css'

function IniciodeCliente() {
    const navigate = useNavigate();

    const irAMovimientos = () => {
        navigate('/movimientos');
    };

    return (
        <div className="inicio-container">

            <div className="inicio-header">
                <Logotipo />
                <MenudeUsuario />
            </div>

            <Saludo />

            <div className="inicio-cliente-datos">
                <div>
                    <img src="/recursos/iconos/velocidad.png" alt="Tiempo de Parqueo" />
                    <div>134.6 horas</div>
                    <div>aparcado</div>
                </div>
                <div>
                    <img src="/recursos/iconos/gas.png" alt="Tanqueos" />
                    <div>340.4 galones</div>
                    <div>tanqueados</div>
                </div>
            </div>

            <div className="inicio-box" onClick={irAMovimientos} style={{cursor: 'pointer'}}>
                <div className="inicio-box-header">
                    <span>TUS ÚLTIMOS MOVIMIENTOS</span>
                    <img src="/recursos/iconos/pago.png" alt="Movimientos" />
                </div>
                <div className="inicio-cliente-movimiento">
                    Transferiste <b>($210.000)</b> a Juan Escobar
                </div>
                <div className="inicio-cliente-movimiento">
                    Tanqueaste 5 galones de gasolina en tu<b> YAMAHA NMAX 115 </b>en Bomba La Maria exitosamente.
                    <button className="continuar-btn" onClick={irAMovimientos}>
                        <img src="/recursos/iconos/continuar.png" alt="Ver más" />
                    </button>
                </div>
            </div>

            <MenuInferior />
        </div>
    );
}

export default IniciodeCliente;