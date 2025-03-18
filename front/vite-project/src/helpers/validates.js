import moment from "moment";

export const RegisterValidation = (values) => {
    const errors = {};

    if (!values.name.trim()) {
        errors.name = "Ingrese su nombre";
    }else if (!/^[A-Za-zÁÉÍÓÚÑÇÑñÜ\s]+$/.test(values.name)) {
        errors.name = "Nombre no válido, use letras y espacios";
    }

    if (!values.email.trim()) {
        errors.email = "Ingrese su email";
    }else if(!/^\S+@\S+\.\S+$/.test(values.email)){
        errors.email = "Email no válido";
    }

    if (!values.date) {
        errors.date = "Ingrese su fecha de nacimiento";
    } else {

      const birthDate = moment(values.date, "YYYY-MM-DD"); 
      const today = moment(); 
      const age = today.diff(birthDate, "years"); 
  
      if (age < 18) {
        errors.date = "Debe tener al menos 18 años para registrarse";
      }
    }

    if(!values.dni){
        errors.dni = "Ingrese su numero de DNI";
    }else if(!/^\d{8}$/.test(values.dni)){
        errors.dni = "El numero de DNI debe tener 8 dígitos";
    }

    if (!values.username.trim()) {
        errors.username = "El nombre de usuario es obligatorio";
      } else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
        errors.username = "El nombre de usuario solo puede contener letras y números";
      }
      
      if (!values.password.trim()) {
        errors.password = "Ingrese su contraseña";
      } else if (values.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos una letra mayúscula";
      } else if (!/[0-9]/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos un número";
      } else if (!/[^a-zA-Z0-9]/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos un carácter especial";
      }
      
      if (!values.confirmPassword) {
        errors.confirmPassword = "Ingrese su contraseña de confirmación";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Las contraseñas no coinciden";
      }
      
    return errors;
}

export const validateLogin = (values) => {
    const errors = {};
  

    if (!values.username) {
      errors.username = "El nombre de usuario es requerido";
    }
  

    if (!values.password) {
      errors.password = "La contraseña es requerida";
    } else if (values.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
  
    return errors;
  };
  