import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      <View style={styles.infoCard}>
        <Text style={styles.info}>Nombre: Usuario Ejemplo</Text>
        <Text style={styles.info}>Correo: ejemplo@correo.com</Text>
      </View>
      <Button title="Cerrar Sesión" onPress={handleLogout} color="#D32F2F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
});

export default ProfileScreen;
