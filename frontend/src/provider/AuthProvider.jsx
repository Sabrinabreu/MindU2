import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    
    const setToken = (newToken) => {
    setToken_(newToken);
};


useEffect(() => {
    // Logica para lidar com o token
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;  // Formato correto com espaço
      localStorage.setItem('token', token);  // Armazena o token no localStorage
    } else {
      delete axios.defaults.headers.common["Authorization"];  // Remove o cabeçalho se o token não existir
      localStorage.removeItem('token');  // Remove o token do localStorage
    }
  }, [token]);  

const contextValue = useMemo(
    () => ({
        token,
        setToken,
    }),
    [token]
);

return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;