import { auth, db } from '../firebase';  // Importamos Firebase desde la configuración

// Función para manejar el inicio de sesión
export const handleLogin = async (email, password, setError, setSuccess) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Obtener datos adicionales desde Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            setSuccess(`Bienvenido de nuevo, ${userData.fullName}`);
        } else {
            setError("No se encontró el documento de usuario.");
        }

        setError('');
    } catch (error) {
        setError(error.message);
    }
};
