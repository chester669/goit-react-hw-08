import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./AppBar.module.css";

const AppBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //   return (
  //     <header className={styles.header}>
  //       <nav className={styles.nav}>
  //         <Navigation />
  //       </nav>
  //       {isLoggedIn ? <UserMenu /> : <AuthNav />}
  //     </header>
  //   );
  // };

  return (
    <div className={styles.appBar}>
      <nav className={styles.nav}>
        <Navigation />
      </nav>
      {isLoggedIn ? (
        <div className={styles.userMenu}>
          <UserMenu />
        </div>
      ) : (
        <AuthNav />
      )}
    </div>
  );
};

export default AppBar;

// import Navigation from "../Navigation/Navigation";
// import AuthNav from "../AuthNav/AuthNav";
// import UserMenu from "../UserMenu/UserMenu";
// import useAuth from "../../hooks/useAuth";
// import styles from "./AppBar.module.css";

// const AppBar = () => {
//   const { isLoggedIn, user } = useAuth();
