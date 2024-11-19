import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { registerUser } from '../utils/api'; 

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, introduce un correo electrónico válido.');
      return;
    }

    try {
      // Llamada a la API para registrar al usuario
      const response = await registerUser(email, password); // Solo envía email y password
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      Alert.alert(
        'Registro Exitoso',
        'Tu cuenta ha sido creada correctamente.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'), 
          },
        ]
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Hubo un problema al registrar. Por favor, inténtalo nuevamente.';
      Alert.alert('Error al Registrarse', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear una Cuenta</Text>
      <Text style={styles.label}>Correo Electronico</Text>
      <TextInput
        style={styles.input}
        placeholder="example@correo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Contrasena</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Escribe tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.togglePasswordVisibility}
        >
          <Text>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  togglePasswordVisibility: {
    padding: 10,
  },
});

export default RegisterScreen;

