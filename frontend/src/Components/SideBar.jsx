import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LogOut, SquareChartGantt, CopyPlus } from 'lucide-react';
import '../css/SideBar.css'; // Certifique-se de que o CSS da sidebar está configurado corretamente

const Sidebar = ({ perfil, isCollapsed, toggleSidebar, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.trim().split(' ').filter(Boolean);
    return names.length > 0
      ? names[0][0].toUpperCase() + (names[1] ? names[1][0].toUpperCase() : '')
      : '';
  };

  const getColorFromInitials = (initials) => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `#${((hash & 0x00ffffff) >> 0).toString(16).padStart(6, '0').toUpperCase()}`;
  };

  const getContrastingColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.substring(1, 3), 16);
    const g = parseInt(backgroundColor.substring(3, 5), 16);
    const b = parseInt(backgroundColor.substring(5, 7), 16);
    const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminosity > 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <div id="navbar" className={isCollapsed ? 'collapsed' : ''}>
      <input id="nav-toggle" type="checkbox" onChange={toggleSidebar} />
      <div id="nav-header">
        <div className={`nav-title ${isCollapsed ? 'hidden' : ''}`}>
          <Link to="/dashboard">
            <h5>Dashboard</h5>
          </Link>
        </div>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <Link to="/dashboard/seuplano">
          <div className="nav-button">
            <i className="fas">
              <SquareChartGantt />
            </i>
            <span>Seu Plano</span>
          </div>
        </Link>
        <Link to="/dashboard/addfuncionario">
          <div className="nav-button">
            <i className="fas">
              <CopyPlus />
            </i>
            <span>Adicionar Funcionários</span>
          </div>
        </Link>
        <Link to="/perfilempresa">
          <div className="nav-button">
            <i className="fas">
              <SquareChartGantt />
            </i>
            <span>Perfil</span>
          </div>
        </Link>
        <div id="nav-content-highlight"></div>
      </div>
      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <div
              className="profile-initials"
              style={{
                backgroundColor: getColorFromInitials(getInitials(perfil.empresa || '')),
                color: getContrastingColor(getColorFromInitials(getInitials(perfil.empresa || ''))),
              }}
            >
              {getInitials(perfil.empresa || '')}
            </div>
          </div>
          <div id="nav-footer-titlebox">
            <a id="nav-footer-title" target="_blank" rel="noopener noreferrer">
              {perfil.empresa}
            </a>
            <span id="nav-footer-subtitle">Admin</span>
          </div>
          <label htmlFor="nav-footer-toggle">
            <i className="fas">
              <ChevronDown />
            </i>
          </label>
        </div>
        <div id="nav-footer-content">
          <button onClick={handleLogout} className="logout">
            Sair
            <LogOut className="logsvg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
