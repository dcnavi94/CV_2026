import { login, logout } from './controllers/auth-controller.js';

// Conectar botones globales
document.getElementById('loginBtn')?.addEventListener('click', login);
document.getElementById('logoutBtn')?.addEventListener('click', logout);
document.getElementById('loginBtnLocker')?.addEventListener('click', login); // Botón extra en el locker
