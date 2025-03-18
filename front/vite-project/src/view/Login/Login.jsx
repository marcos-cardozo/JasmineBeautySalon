 
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { validateLogin } from "../../helpers/validates";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContext";
import { useContext } from "react";

const Login = () => {

  const { loginUser } = useContext(UsersContext);

  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateLogin,
    initialErrors: {
      username: "Usuario es obligatorio",
      password: "Contraseña es obligatoria",
    },
    initialTouched: {
      username: true,
      password: true,
    },
    onSubmit: (values, { resetForm }) => {
      const payload = {
        username: values.username,
        password: values.password,
      };

      loginUser(payload)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Sesión iniciada con éxito",
              text: "Ahora puedes acceder a tus turnos",
            });
            localStorage.setItem("userId", res.data.user.id);
            navigate("/")
            resetForm();
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response?.status === 400) {
            Swal.fire({
              icon: "error",
              title: `${error.response.data.data}`,
              text: "Intente nuevamente",
            });
          } else if (error.response?.data?.message) {
            Swal.fire({
              icon: "error",
              title: `${error.response.data.details}`,
              text: "Ocurrió un problema, intente nuevamente",
            });
          }
        });
    },
  });

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
        <h1 className={styles.loginTitle}>Inicio de sesión</h1>

        <label className={styles.loginLabel}>Usuario:</label>
        <input
          className={styles.loginInput}
          type="text"
          name="username"
          placeholder="Ingrese su usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <label className={styles.errorLabel}>{formik.errors.username}</label>
        ) : null}

        <label className={styles.loginLabel}>Contraseña:</label>
        <input
          className={styles.loginInput}
          type="password"
          name="password"
          placeholder="Ingrese su contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <label className={styles.errorLabel}>{formik.errors.password}</label>
        ) : null}

        <div className={styles.loginButtonContainer}>
          <button
            className={styles.loginButton}
            type="submit"
            disabled={
              !formik.values.username ||
              !formik.values.password ||
              formik.errors.username ||
              formik.errors.password
            }
          >
            Iniciar sesión
          </button>
        </div>
        <br />
        <p className={styles.linkLabel}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" className={styles.linkLabelReal}>
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
