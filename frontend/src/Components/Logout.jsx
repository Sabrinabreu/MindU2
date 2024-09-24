import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { Button } from 'react-bootstrap';

const Logout = () => {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navegacao("/", { replace: true });
  };

//   setTimeout(() => {
//     handleLogout();
//   }, 1 * 1500);

  return <Button className="btnLog" onClick={handleLogout}><span class="material-symbols-outlined iconLog">logout</span>Sair da conta</Button>;
};

export default Logout;



{/* <div className="tableSistemaGeral d-flex"><h4>Saindo do sistema</h4> <i className="pi pi-spin pi-spinner-dotted" style={{ fontSize: '2rem' }}></i></div> */ }