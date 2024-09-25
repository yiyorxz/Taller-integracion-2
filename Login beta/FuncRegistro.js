import { auth, db } from '../firebase';  // Importamos Firebase desde la configuración

// Función para manejar el registro
export const handleRegister = async (email, password, repPassword, fullName, username, setError, setSuccess) => {
    if (password !== repPassword) {
        setError('Las contraseñas no coinciden.');
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Guardar información extra en Firestore
        await db.collection('users').doc(user.uid).set({
            email: email,
            fullName: fullName,
            username: username,
        });

        setSuccess('Usuario registrado con éxito.');
        setError('');
    } catch (error) {
        setError(error.message);
    }
};
