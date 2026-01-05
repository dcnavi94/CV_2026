// Configuración centralizada de administradores
// En el futuro, esto podría venir de una colección 'admins' en base de datos
const ADMIN_EMAILS = ["icarapia94@gmail.com"];

class User {
    constructor(firebaseUser) {
        this.uid = firebaseUser.uid;
        this.email = firebaseUser.email;
        this.displayName = firebaseUser.displayName;
        this.photoURL = firebaseUser.photoURL;
    }

    // Método seguro para verificar si es admin
    isAdmin() {
        return this.email && ADMIN_EMAILS.includes(this.email);
    }
}

// Instancia única (Singleton) para manejar el estado actual
export const currentUser = {
    data: null, // Aquí se guardará la instancia de User

    set(firebaseUser) {
        this.data = firebaseUser ? new User(firebaseUser) : null;
    },

    get() {
        return this.data;
    },

    isAdmin() {
        return this.data ? this.data.isAdmin() : false;
    }
};
