import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user.name);

  return (
    <div className={styles.userMenu}>
      <span className={styles.userName}>Welcome, {userName}</span>
      <button
        className={styles.logoutButton}
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
