import * as SecureStore from 'expo-secure-store';

export const setItem = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log('Datos guardados correctamente');
    } catch (error) {
        console.log('Error al guardar los datos:', error);
    }
}

export const getItem = async (key: string) => {
    try {
        const data = await SecureStore.getItemAsync(key);
        if (data !== null) {
            console.log('Datos recuperados correctamente');
            return data;
        } else {
            console.log('No se encontraron datos');
            return '';
        }
    } catch (error) {
        console.log('Error al recuperar los datos:', error);
        return '';
    }
}

export const removeItem = async (key: string) => {
    try {
        await SecureStore.deleteItemAsync(key);
        console.log('Datos eliminados correctamente');
    } catch (error) {
        console.log('Error al eliminar los datos:', error);
    }
}
