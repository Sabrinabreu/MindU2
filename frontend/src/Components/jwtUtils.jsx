// jwtUtils.js
export function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1]; // Pega a parte do payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Corrige a string de Base64
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload); // Retorna o payload como objeto
    } catch (e) {
      console.error('Erro ao decodificar o JWT:', e);
      return null;
    }
  }
  