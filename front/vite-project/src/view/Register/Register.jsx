import { RegisterValidation } from "../../helpers/validates";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UserContext";

const Register = () => {

  const { registerUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      date: "",
      dni: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: RegisterValidation,
    initialErrors: {
      name: "Nombre es obligatorio",
      email: "Email es obligatorio",
      date: "Fecha de nacimiento es obligatoria",
      dni: "Numero de DNI es obligatorio",
      username: "Nombre de usuario es obligatorio",
      password: "La contraseña es obligatorio",
      confirmPassword: "Confirmar La contraseña es obligatorio",
    },
    initialTouched: {
      name: true,
      email: true,
      date: true,
      dni: true,
      username: true,
      password: true,
      confirmPassword: true,
    },
    onSubmit: (values) => {
        const payload = {
          name: values.name,
          email: values.email,
          birthdate: values.date, 
          nDni: values.dni,       
          username: values.username,
          password: values.password,
        };
      
        registerUser(payload)
          .then((res) => {
            if (res.status === 201) {
              Swal.fire({
                icon: 'success',
                title: 'Usuario registrado con éxito',
              });
              formik.resetForm();
              navigate("/login");
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al registrar',
              text: error.response?.data?.data || 'Ha ocurrido un error',
            });
          });
      }
  });               
  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm}>
        <h1 className={styles.registerTitle}>Registro de usuario</h1>

        <label className={styles.registerLabel}>Nombre:</label>
        <input
          className={styles.registerInput}
          type="text"
          placeholder="Ejemplo: Juan Perez"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <label className={styles.errorLabel}>{formik.errors.name}</label>
        ) : null}

        <label className={styles.registerLabel}>Email:</label>
        <input
          className={styles.registerInput}
          type="email"
          placeholder="Ejemplo: juanperez@gmail.com"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <label className={styles.errorLabel}>{formik.errors.email}</label>
        ) : null}

        <label className={styles.registerLabel}>Fecha de nacimiento:</label>
        <input
          className={styles.registerInput}
          type="date"
          name="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
        {formik.touched.date && formik.errors.date ? (
          <label className={styles.errorLabel}>{formik.errors.date}</label>
        ) : null}

        <label className={styles.registerLabel}>Numero de DNI:</label>
        <input
          className={styles.registerInput}
          type="text"
          placeholder="Ejemplo: 123456789"
          name="dni"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dni}
        />
        {formik.touched.dni && formik.errors.dni ? (
          <label className={styles.errorLabel}>{formik.errors.dni}</label>
        ) : null}

        <label className={styles.registerLabel}>Nombre de usuario:</label>
        <input
          className={styles.registerInput}
          type="text"
          placeholder="Ejemplo: juanperez"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <label className={styles.errorLabel}>{formik.errors.username}</label>
        ) : null}

        <label className={styles.registerLabel}>Contraseña:</label>
        <input
          className={styles.registerInput}
          type="password"
          placeholder="********"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <label className={styles.errorLabel}>{formik.errors.password}</label>
        ) : null}

        <label className={styles.registerLabel}>Confirmar contraseña:</label>
        <input
          className={styles.registerInput}
          type="password"
          placeholder="********"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <label className={styles.errorLabel}>
            {formik.errors.confirmPassword.toString()}
          </label>
        ) : null}

        <div className={styles.registerButtonContainer}>
          <button
            className={styles.registerButton}
            type="submit"
            disabled={
              !formik.values.name ||
              !formik.values.email ||
              !formik.values.date ||
              !formik.values.username ||
              !formik.values.password ||
              !formik.values.confirmPassword
            }
            onClick={formik.handleSubmit}
          >
            Registrar
          </button>
        </div>
        <br />
          <p className={styles.linkLabel}>¿Ya tienes una cuenta? <Link to="/login" className={styles.linkLabelReal}>Inicia Sesión</Link></p>
      </form>
    </div>
  );
};

export default Register;
