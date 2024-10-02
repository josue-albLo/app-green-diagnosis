import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function Index() {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Esperar a que el componente esté listo para redirigir
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (isReady) {
            console.log('Redirigiendo a /login...');
            router.replace('/login');
        }
    }, [isReady]);


    return null; // No mostrar nada mientras se redirige
}
