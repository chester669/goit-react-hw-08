import { Link } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <h2>Register</h2>
      <RegisterForm />
      <p>
        Already have an account? <Link to="/login">Login!</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
