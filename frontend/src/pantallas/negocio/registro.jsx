import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsuario } from "../../contextos/contextodeUsuario.jsx";
import LogotipodeNegocio from "../../componentes/visuales/logotipodeNegocio.jsx";
import './negocio.css';

function RegistrodeNegocio() {
    const navigate = useNavigate();
    const { updateTipodeUsuario, updateDatosdeUsuario } = useUsuario();
    const [showModaldeNegocio, setShowModaldeNegocio] = useState(false);
    const [DatosdeFormulario, setDatosdeFormulario] = useState({
        fullName: '',
        documentNumber: '',
        documentType: 'C.C.',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [businessInfo, setBusinessInfo] = useState({
        businessName: '',
        nit: '',
        address: '',
        phone: '',
        serviceType: ''
    });

    const handleCambiodeFormulario = (field, value) => {
        setDatosdeFormulario(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBusinessInfoChange = (field, value) => {
        setBusinessInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveBusinessInfo = () => {
        // Aquí puedes agregar validación si es necesario
        setShowModaldeNegocio(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (DatosdeFormulario.password !== DatosdeFormulario.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Crear objeto con los datos del usuario y negocio
        const DatosdeUsuario = {
            fullName: DatosdeFormulario.fullName,
            documentNumber: DatosdeFormulario.documentNumber,
            documentType: DatosdeFormulario.documentType,
            email: DatosdeFormulario.email,
            businessName: businessInfo.businessName,
            nit: businessInfo.nit,
            address: businessInfo.address,
            phone: businessInfo.phone,
            serviceType: businessInfo.serviceType,
            TipodeUsuario: 'negocio',
            registrationDate: new Date().toISOString()
        };

        // Guardar datos del usuario en el contexto
        updateDatosdeUsuario(DatosdeUsuario);
        updateTipodeUsuario('negocio');

        // Navegar al home
        navigate('/inicio');
    };

    const getBusinessInfoDisplay = () => {
        if (businessInfo.businessName) {
            return `${businessInfo.businessName} - ${businessInfo.serviceType || 'Sin especificar'}`;
        }
        return '';
    };

    return (
        <div className="registro-container">
            <header className="registro-header">
                <button className="volver-btn" onClick={() => navigate('/')}>
                    {<img src="/recursos/iconos/volver.png" alt="Volver" />} VOLVER
                </button>
                <LogotipodeNegocio />
            </header>

            <h1 className="registro-title">¡REGISTRATE COMO NEGOCIO!</h1>

            <form className="registro-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="NOMBRES Y APELLIDOS"
                        value={DatosdeFormulario.fullName}
                        onChange={(e) => handleCambiodeFormulario('fullName', e.target.value)}
                        required
                    />
                    <div className="id-row">
                        <input
                            type="number"
                            placeholder="IDENTIFICACIÓN"
                            value={DatosdeFormulario.documentNumber}
                            onChange={(e) => handleCambiodeFormulario('documentNumber', e.target.value)}
                            min="10000000"
                            max="1999999999"
                            required
                        />
                        <select
                            className="tipo-de-documento-select"
                            value={DatosdeFormulario.documentType}
                            onChange={(e) => handleCambiodeFormulario('documentType', e.target.value)}
                        >
                            <option value="C.C.">C.C.</option>
                            <option value="C.E.">C.E.</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="CORREO ELECTRÓNICO"
                        value={DatosdeFormulario.email}
                        onChange={(e) => handleCambiodeFormulario('email', e.target.value)}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                    />
                    <input
                        type="password"
                        placeholder="CONTRASEÑA"
                        value={DatosdeFormulario.password}
                        onChange={(e) => handleCambiodeFormulario('password', e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="REPITE TU CONTRASEÑA"
                        value={DatosdeFormulario.confirmPassword}
                        onChange={(e) => handleCambiodeFormulario('confirmPassword', e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="SOBRE TU NEGOCIO"
                        value={getBusinessInfoDisplay()}
                        readOnly
                        onClick={() => setShowModaldeNegocio(true)}
                        style={{ cursor: 'pointer' }}
                    />
                    <button type="submit" className="registro-btn">REGISTRO</button>
                </div>
            </form>

            {/* Modal para información del negocio */}
            {showModaldeNegocio && (
                <div className="modal-overlay" onClick={() => setShowModaldeNegocio(false)}>
                    <div className="negocio-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>INFORMACIÓN DEL NEGOCIO</h3>
                            <button
                                className="cerrar-btn"
                                onClick={() => setShowModaldeNegocio(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-content">
                            <input
                                type="text"
                                placeholder="NOMBRE DEL NEGOCIO"
                                value={businessInfo.businessName}
                                onChange={(e) => handleBusinessInfoChange('businessName', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="NIT O RUT"
                                value={businessInfo.nit}
                                onChange={(e) => handleBusinessInfoChange('nit', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="DIRECCIÓN DEL NEGOCIO"
                                value={businessInfo.address}
                                onChange={(e) => handleBusinessInfoChange('address', e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="TELÉFONO DEL NEGOCIO"
                                value={businessInfo.phone}
                                onChange={(e) => handleBusinessInfoChange('phone', e.target.value)}
                            />
                            SELECCIONA EL TIPO DE SERVICIO
                            <div className="tipo-row">
                                <select
                                    value={businessInfo.serviceType}
                                    onChange={(e) => handleBusinessInfoChange('serviceType', e.target.value)}
                                >
                                    <option value="Parqueadero">Parqueadero</option>
                                    <option value="Mecánica General">Mecánica General</option>
                                    <option value="Carrocería y Pintura">Carrocería y Pintura</option>
                                    <option value="Neumáticos y Alineación">Neumáticos y Alineación</option>
                                    <option value="Gasolinera">Gasolinera</option>
                                    <option value="Lavado de Vehículos">Lavado de Vehículos</option>
                                    <option value="Escuela de Manejo">Escuela de Manejo</option>
                                    <option value="Servicios de Grúa">Servicios de Grúa</option>
                                    <option value="Otros Servicios">Otros Servicios</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="guardar-btn"
                                    onClick={handleSaveBusinessInfo}
                                >
                                    GUARDAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegistrodeNegocio;
