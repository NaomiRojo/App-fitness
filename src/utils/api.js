import axios from 'axios';

// Función para registrar un usuario usando Reqres API
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post('https://reqres.in/api/register', {
      email,
      password,
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    throw error.response
      ? error.response.data.error
      : 'Error desconocido al conectar con la API';
  }
};
