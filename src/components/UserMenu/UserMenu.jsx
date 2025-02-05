import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import styles from "../Layout/Layout.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles["logout-button"]}
      onClick={() => dispatch(logout())}
    >
      Logout
    </button>
  );
};

export default UserMenu;
