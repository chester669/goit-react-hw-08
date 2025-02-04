import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOps";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles["form-container"]}>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(login(values))
            .unwrap()
            .then(() => navigate("/"))
            .catch((error) => alert(error));
          resetForm();
        }}
      >
        <Form className={styles.form}>
          <label>Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />

          <label>Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
