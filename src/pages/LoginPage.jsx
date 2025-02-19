import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <p>
        Do not have an account? <Link to="/register">Register!</Link>
      </p>
    </div>
  );
};

export default LoginPage;
