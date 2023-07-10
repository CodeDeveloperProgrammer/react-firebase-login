import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { LoadingButton } from "@mui/lab";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //AHORA USO ESTO MISMO PERO EN REGISTER DESDE EL HOOK PERSONALIZADO useRedirectActiveUser
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log(email, password);
    try {
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        return setErrors({ email: "Usuario no registrado" });
      }
      if (error.code === "auth/wrong-password") {
        return setErrors({ password: "La contraseña es incorrecta" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Revise el formato del email")
      .required("El email es requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Mínimo 6 carcteres")
      .required("La contraseña es obligatoria"),
  });

  return (
    <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "white" }}>
        <LockOutlinedIcon sx={{color:"#1976d2"}}/>
      </Avatar>

      <Typography sx={{color:"#1976d2"}} variant="h5" component="h1">
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <Box onSubmit={handleSubmit} sx={{ mt: 1 }} component={"form"}>
            <TextField
              type="text"
              name="email"
              id="email"
              placeholder="email@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Ingrese su email"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />

            {/*             <input
              type="text"
              name="email"
              placeholder="Su email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
 */}

            <TextField
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Ingrese su password"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />
            {/*   <input
              type="password"
              name="password"
              placeholder="Su password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && errors.password} */}

            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              sx={{ mb: 3 }}
            >
              Login
            </LoadingButton>

{/*             <button type="submit" disabled={isSubmitting}>
              Login
            </button> */}

            <Button
              fullWidth
              component={Link}
              to="/register"
            >
              ¿No tienes cuenta? Regístrate
            </Button>

          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
