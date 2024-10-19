
import axios from 'axios';

export const uploadDiagnosticToCloud = async (token: string, data: any) => {
    try {
        console.log(data);
    } catch (err) {
        axios.isAxiosError(err);
        console.log(err);
    }
}

export const getDiagnosticFromCloud = async (token: string) => {
    try {
        console.log(token);
    } catch (err) {
        axios.isAxiosError(err);
        console.log(err);
    }
}