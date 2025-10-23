// Utilidad para obtener la URL del backend desde variables de entorno
const getBackendUrl = () => {
  // Obtener la URL del backend desde las variables de entorno
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  // Si no está definida, usar localhost por defecto
  if (!backendUrl) {
    console.warn('REACT_APP_BACKEND_URL no está definida, usando localhost:4000 por defecto');
    return 'http://localhost:4000';
  }
  
  // Remover la @ del inicio si existe
  const cleanUrl = backendUrl.startsWith('@') ? backendUrl.substring(1) : backendUrl;
  
  // Asegurar que termine con /
  return cleanUrl.endsWith('/') ? cleanUrl.slice(0, -1) : cleanUrl;
};

export default getBackendUrl;
