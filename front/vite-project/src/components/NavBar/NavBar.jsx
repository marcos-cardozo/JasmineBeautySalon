import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";
import styles from "./NavBar.module.css";
import logo from "/logo.png";

const NavBar = () => {
  const { logoutUser } = useContext(UsersContext);

  const handleLogOut = () => {
    logoutUser();
  };

  return (
    <header>
      <nav className={styles.navBar}>
        <img src={logo} className={styles.logo} alt="Logo" />

        <div className={styles.listAndUserContainer}>
          <ul className={styles.listNavBar}>
            <li>
              <Link to="/" className={styles.itemlistNavBar}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/aboutUs" className={styles.itemlistNavBar}>
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/createAppointment" className={styles.itemlistNavBar}>
                Agendar turno
              </Link>
            </li>
            <li>
              <Link to="/myAppointments" className={styles.itemlistNavBar}>
                Mis Turnos
              </Link>
            </li>
            <li>
              <button onClick={handleLogOut} className={styles.itemlistNavBar}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
