const getBackendUrl = () => {
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
  
  // Debug info
  console.log('=== DEBUG BACKEND URL ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Hostname:', window.location.hostname);
  console.log('isDevelopment:', isDevelopment);
  console.log('REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);
  
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  // Si está definida en las variables de entorno, usarla
  if (backendUrl) {
    const cleanUrl = backendUrl.startsWith('@') ? backendUrl.substring(1) : backendUrl;
    const finalUrl = cleanUrl.endsWith('/') ? cleanUrl.slice(0, -1) : cleanUrl;
    console.log('Usando URL de variable de entorno:', finalUrl);
    console.log('========================');
    return finalUrl;
  }
  
  // Si no está definida, usar valores por defecto según el entorno
  if (isDevelopment) {
    console.log('Modo desarrollo detectado, usando localhost:4000');
    console.log('========================');
    return 'http://localhost:4000';
  } else {
    console.log('Modo producción detectado, usando URL de Vercel');
    console.log('========================');
    return 'https://spot-6sfq.vercel.app';
  }
};

export default getBackendUrl;
