import { db, collection, getDocs } from '../config/firebase-config.js';

export async function getAllUsers() {
    console.log("Iniciando getAllUsers...");
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(`Docs encontrados: ${querySnapshot.size}`);

        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return users;
    } catch (error) {
        console.error("Error FATAL al obtener usuarios:", error);
        // Retornar array vacío para que al menos no se rompa la UI
        return [];
    }
}
