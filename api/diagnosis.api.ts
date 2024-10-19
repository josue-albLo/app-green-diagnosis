
import { DiseaseRequest } from '@/interfaces/disease.interface';
import axios from 'axios';
const API_URL = process.env.EXPO_PUBLIC_API_DIAGNOSTIC_URL ?? '';

export const uploadDiagnosticToCloud = async (token: string, data: DiseaseRequest) => {
    try {
        const res = await axios.post(`${API_URL}/up`, data, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err.response?.data);
            return err.response?.data;
        }
    }
}

export const getDiagnosticFromCloud = async (token: string) => {
    try {
        const res = await axios.get(`${API_URL}/get`, {
            headers: {
                Authorization: `${token}`,
            }
        });
        return res.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err.response?.data);
            return err.response?.data;
        }
    }
}