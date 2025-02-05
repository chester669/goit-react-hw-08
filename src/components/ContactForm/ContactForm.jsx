import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import styles from "./ContactForm.module.css";
const validationSchema = Yup.object({
  name: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  number: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Add Contact</h2>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label>Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />

          <label>Phone Number:</label>
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="div" />

          <button type="submit">Add Contact</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
