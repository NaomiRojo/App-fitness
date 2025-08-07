import axios from 'axios';


export const registerUser = async (email, password) => {
  try {
    const response = await axios.post('https://reqres.in/api/register', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data.error
      : 'Error desconocido al conectar con la API';
  }
};
