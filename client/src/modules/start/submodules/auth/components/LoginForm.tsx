import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email es requerido';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Contraseña es requerida';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Formulario enviado', formValues);
    }
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
          Ingresar
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          placeholder="jrod@gmail.com"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            label="Password"
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
        >
          Ingresar
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          ¿Aún no tienes cuenta?{' '}
          <Button
            component={RouterLink}
            to="/register"
            color="inherit"
            variant="text"
            sx={{ p: 1, textTransform: 'none' }}
          >
            Crear cuenta
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};
