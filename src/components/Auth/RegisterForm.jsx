import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles["form-container"]}>
      <h2>Register</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(register(values))
            .unwrap()
            .then(() => navigate("/"))
            .catch((error) => alert(error));
          resetForm();
        }}
      >
        <Form className={styles.form}>
          <label>Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />

          <label>Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />

          <label>Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
