import "./botones.css";
import { useNavigate } from 'react-router-dom';

function Volver() {
	const navigate = useNavigate();
    return (
	<button className="volver-btn" onClick={() => navigate(-1)}>{<img src="/recursos/iconos/volver.png" alt="" />} VOLVER</button>
)};

export default Volver;