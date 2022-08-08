import axios from 'axios';

export const getUsers = async () => {
    const response = await axios('/api/users');
    return response.data;
}

export const setUserGeo = (payload) => {
    try {
        const response = {
            data: {
                latitude: payload.latitude,
                longitude: payload.longitude,
            }
        }
        return response.data; 
    } catch (error) {
        console.log('error', error);
    }
  }