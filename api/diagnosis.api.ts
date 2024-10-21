
import axios from 'axios';
const API_URL = process.env.EXPO_PUBLIC_API_DIAGNOSTIC_URL ?? '';

export const upImageToPredict = async (token: string, image: FormData) => {
    console.log('token', token);
    try {
        const res = await axios.post(`${API_URL}/predict`, image, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err.response?.data);
            return err.response?.data;
        }
    }
}

export const createFormData = (photo: string = ''): FormData => {
    const currentTimestamp = new Date().getTime();
    const data = new FormData();
    console.log('currentTimestamp', currentTimestamp);
    data.append('file', {
        uri: photo,
        type: 'image/jpeg', // Asegúrate de que el tipo MIME sea correcto
        name: `${currentTimestamp}.jpg`, // Agrega el nombre del archivo
    } as any);
    return data;
}

export const getHistory = async (token: string, email: string) => {
    console.log('getHistory', token, email);
    try {
        const res = await axios.post(`${API_URL}/history`, { email }, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err.response?.data);
            return err.response?.data;
        }
    }
}
