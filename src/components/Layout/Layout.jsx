import { Outlet, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Layout.module.css";

const Layout = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          {isLoggedIn && <Link to="/contacts">Contacts</Link>}
          {isLoggedIn && <p className={styles.welcome}>Welcome, {user.name}</p>}
          {isLoggedIn ? <UserMenu /> : <Link to="/login">Login</Link>}
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
