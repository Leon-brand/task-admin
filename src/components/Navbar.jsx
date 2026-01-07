

import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm("¿Deseas cerrar sesión?");
    if (!confirmed) return;

    await logout();
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <h1 className="app-title">Task Admin</h1>
      </div>

      <div className="navbar-right">
        <span className="user-email">{user?.email}</span>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
