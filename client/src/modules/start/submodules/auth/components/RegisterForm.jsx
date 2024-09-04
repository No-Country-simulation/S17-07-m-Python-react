import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { register } from '../services/register';

const formInitialValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const [formValues, setFormValues] = useState(formInitialValue);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === 'termsAccepted' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, termsAccepted } =
      formValues;
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: '',
    };

    if (!username) {
      newErrors.username = 'Nombre de usuario es requerido';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Correo es requerido';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Contraseña es requerida';
      isValid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es requerido';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }
    if (!termsAccepted) {
      newErrors.termsAccepted = 'Debe aceptar los términos y condiciones';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      register(username, email, password).then(
        (response) => {
          if (response?.ok === true) {
            setSnackbarMessage('¡Registro exitoso!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            setFormValues(formInitialValue);
          }
          if (response?.ok === false) {
            setSnackbarMessage(response.message || 'Datos inválidos');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          }
        },
        (error) => {
          setSnackbarMessage(
            'Error en el registro: ' +
              (error.message || 'Ocurrió un error inesperado'),
          );
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        },
      );
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Registrar
        </Typography>
        <TextField
          fullWidth
          label="Usuario"
          variant="outlined"
          margin="normal"
          type="text"
          placeholder="Usuario"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          label="Correo"
          variant="outlined"
          margin="normal"
          type="email"
          placeholder="mi-correo@gmail.com"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            placeholder="**********"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Button
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            onClick={togglePassword}
          >
            {showPassword ? '🙈' : '👁️'}
          </Button>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            variant="outlined"
            margin="normal"
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="**********"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
          <Button
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            onClick={togglePasswordConfirm}
          >
            {showPasswordConfirm ? '🙈' : '👁️'}
          </Button>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              name="termsAccepted"
              checked={formValues.termsAccepted}
              onChange={handleChange}
            />
          }
          label={
            <Typography variant="body2">
              Acepto los{' '}
              <Button variant="text" color="primary" onClick={handleOpenModal}>
                términos y condiciones
              </Button>
            </Typography>
          }
        />
        {errors.termsAccepted && (
          <Typography color="error" variant="body2">
            {errors.termsAccepted}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
        >
          Crear cuenta
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          ¿Ya tienes cuenta?{' '}
          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            variant="text"
            sx={{ p: 1, textTransform: 'none' }}
          >
            Ingresar
          </Button>
        </Typography>
      </Box>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Términos y Condiciones
          </Typography>
          <Typography variant="body2">
            Al registrarte en nuestra aplicación, aceptas proporcionar un nombre
            de usuario y una dirección de correo electrónico válida. Esta
            información es esencial para la creación y gestión de tu cuenta. Al
            usar nuestra aplicación, confirmas que la información que
            proporcionas es precisa, completa y actualizada. Nos reservamos el
            derecho de verificar la validez de la información proporcionada y de
            suspender o cancelar tu cuenta si se detectan datos incorrectos o
            falsos. Tu nombre de usuario debe ser único y no debe infringir
            derechos de propiedad intelectual ni ser ofensivo. Además, aceptas
            recibir comunicaciones relacionadas con tu cuenta y nuestras
            actualizaciones de servicio a través del correo electrónico
            proporcionado. La privacidad de tus datos es importante para
            nosotros, y manejamos tu información conforme a nuestra Política de
            Privacidad. La creación de una cuenta implica que estás de acuerdo
            con nuestros términos de servicio, que pueden actualizarse
            periódicamente.
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
