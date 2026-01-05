import { auth, provider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, db, doc, setDoc } from '../config/firebase-config.js';
import { currentUser } from '../models/user.js';

// UI Elements (Búsqueda defensiva)
const getEl = (id) => document.getElementById(id);

const ui = {
    loginBtn: getEl('loginBtn'),
    logoutBtn: getEl('logoutBtn'),
    userInfo: getEl('userInfo'),
    adminPanel: getEl('adminPanel'),
    authSection: getEl('authSection'),
    contentLocker: getEl('contentLocker'),
    videoContainer: getEl('videoContainer')
};

const ADMIN_EMAIL = "icarapia94@gmail.com";

// --- LOGIN LOGIC ---

async function handleUserLogin(user) {
    console.log("Processing Login for:", user.email);

    // GUARDAR/ACTUALIZAR USUARIO EN FIRESTORE
    try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date().toISOString(),
            role: (user.email === ADMIN_EMAIL) ? 'admin' : 'student'
        }, { merge: true });

        console.log("Usuario sincronizado en DB");

        // Redirección Admin si aplica
        if (user.email === ADMIN_EMAIL && !window.location.pathname.includes('/admin')) {
            // Solo redirigir si el usuario lo confirma, para no interrumpir flujos
        }
    } catch (e) {
        console.error("Error saving user:", e);
    }
}

// Check for Redirect Result (Mobile Flow)
getRedirectResult(auth).then((result) => {
    if (result) {
        console.log("Recuperado de Redirect Login");
        handleUserLogin(result.user);
    }
}).catch((error) => {
    console.error("Redirect Error:", error);
});


export async function login() {
    try {
        console.log("Attempting Popup Login...");
        const result = await signInWithPopup(auth, provider);
        await handleUserLogin(result.user);
    } catch (error) {
        console.warn("Popup failed/blocked. Trying Redirect...", error);
        // Fallback to Redirect for Mobile/Blocked Popups
        try {
            await signInWithRedirect(auth, provider);
        } catch (e) {
            alert("Error login: " + e.message);
        }
    }
}

export async function logout() {
    try {
        await signOut(auth);
        location.reload();
    } catch (error) {
        console.error("Logout:", error);
    }
}

// === OBSERVER & UI ===
onAuthStateChanged(auth, (firebaseUser) => {
    console.log("AuthStateChanged:", firebaseUser ? firebaseUser.email : "No User");
    currentUser.set(firebaseUser);

    // Forzar actualización de UI elements por si el DOM cambió
    ui.loginBtn = getEl('loginBtn');
    ui.logoutBtn = getEl('logoutBtn');
    ui.userInfo = getEl('userInfo');
    ui.adminPanel = getEl('adminPanel');

    updateUI();

    // Evento globlal
    window.dispatchEvent(new CustomEvent(firebaseUser ? 'user-login' : 'user-logout', { detail: currentUser.get() }));
});

function updateUI() {
    const user = currentUser.get();

    // 1. Botones Login/Logout
    toggle(ui.loginBtn, !user);
    toggle(ui.logoutBtn, !!user);

    // 2. Info de Usuario
    if (ui.userInfo) {
        if (user) {
            ui.userInfo.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px;">
                    <img src="${user.photoURL}" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--accent);">
                    <div style="line-height:1.3; text-align:left;">
                        <div style="font-weight:700; font-size:0.9rem; color:#fff;">${user.displayName}</div>
                        <div style="font-size:0.75rem; color:var(--accent);">${currentUser.isAdmin() ? '★ Instructor' : 'Estudiante'}</div>
                    </div>
                </div>
            `;
        } else {
            ui.userInfo.textContent = '';
        }
    }

    // 3. Panel Admin (Exclusivo Admin.html)
    if (ui.adminPanel) {
        const isAdmin = currentUser.isAdmin();
        console.log("Checking Admin Access for Panel. IsAdmin:", isAdmin);

        if (isAdmin) {
            ui.adminPanel.style.display = 'block';
        } else {
            ui.adminPanel.style.display = 'none';
        }

        if (user && !isAdmin) {
            ui.userInfo.innerHTML += `<div style="color:#ef4444; font-size:0.8rem; margin-top:4px;">⛔ Admin access denied for ${user.email}</div>`;
        }
    }

    // 4. Bloqueo de Contenido (Exclusivo Cursos)
    const locker = getEl('contentLocker');
    const vidContainer = getEl('videoContainer');

    if (vidContainer && locker) {
        if (user) {
            // Logueado: Ver video
            vidContainer.style.display = 'block';
            locker.style.display = 'none';
        } else {
            // No logueado: Bloqueo
            vidContainer.style.display = 'none';
            locker.style.display = 'flex';
        }
    }
}

function toggle(el, condition) {
    if (el) el.style.display = condition ? (el.tagName === 'BUTTON' ? 'inline-block' : 'block') : 'none';
}
