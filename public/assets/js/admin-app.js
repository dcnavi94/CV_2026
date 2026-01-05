import { login, logout } from './controllers/auth-controller.js';
import { addCourse, getCourses, deleteCourse, updateCourse, getCourseById } from './controllers/course-controller.js';
import { getAllUsers } from './controllers/user-controller.js';
import { onAuthStateChanged, auth, db, doc, setDoc } from './config/firebase-config.js';

console.log("🚀 ADMIN APP CARGANDO...");

// --- FUNCIONES GLOBALES (DEFINIR PRIMERO) ---

window.addLessonManual = function () {
    console.log("🔥 Click en Añadir Lección");
    const titleEl = document.getElementById('newLessonTitle');
    const typeSelect = document.getElementById('newLessonType');

    if (!titleEl || !typeSelect) return console.error("Elementos no encontrados");

    const title = titleEl.value.trim();
    const type = typeSelect.value;

    if (!title) {
        alert("⚠️ Escribe un título.");
        titleEl.focus();
        return;
    }

    let data = { title, type };
    let valid = false;

    if (type === 'video') {
        const vid = document.getElementById('lessonVideoId').value.trim();
        if (vid) { data.video = vid; valid = true; document.getElementById('lessonVideoId').value = ""; }
        else alert("Falta ID de Video");
    }
    else if (type === 'quiz') {
        if (window.tempQuizQuestions && window.tempQuizQuestions.length > 0) {
            data.questions = [...window.tempQuizQuestions];
            window.tempQuizQuestions = [];
            document.getElementById('quizPreview').innerHTML = '';
            valid = true;
        } else {
            alert("El quiz está vacío");
        }
    }
    else {
        const url = document.getElementById('lessonUrl').value.trim();
        if (url) { data.url = url; valid = true; document.getElementById('lessonUrl').value = ""; }
        else alert("Falta URL");
    }

    if (valid) {
        window.currentLessons.push(data);
        renderLessonsUI();
        titleEl.value = "";
    }
};

window.addQuestionManual = function () {
    console.log("🔥 Click Añadir Pregunta");
    const q = document.getElementById('qText').value.trim();
    const a0 = document.getElementById('opt0').value.trim();
    const a1 = document.getElementById('opt1').value.trim();

    if (q && a0 && a1) {
        window.tempQuizQuestions.push({ question: q, options: [a0, a1], correct: 0 });
        const p = document.getElementById('quizPreview');
        if (p) p.innerHTML = `<b>${window.tempQuizQuestions.length}</b> preguntas listas.`;

        document.getElementById('qText').value = "";
        document.getElementById('opt0').value = "";
        document.getElementById('opt1').value = "";
        document.getElementById('qText').focus();
    } else {
        alert("Falta Pregunta o Opciones A/B");
    }
};

// GLOBAL STATE
window.currentLessons = [];
window.tempQuizQuestions = [];

// UI RENDERERS
function renderLessonsUI() {
    const list = document.getElementById('lessonsContainer');
    if (!list) return;
    list.innerHTML = '';
    window.currentLessons.forEach((l, i) => {
        const div = document.createElement('div');
        div.className = 'lesson-card';
        div.innerHTML = `<strong>${i + 1}. ${l.title} (${l.type})</strong> <button onclick="window.removeLesson(${i})" style="color:red;border:none;background:none;cursor:pointer;">X</button>`;
        list.appendChild(div);
    });
}
window.removeLesson = (i) => { window.currentLessons.splice(i, 1); renderLessonsUI(); };


// --- INIT & LOGIC ---

// Listeners seguros
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.addEventListener('click', logout);

const createForm = document.getElementById('createCourseForm');
if (createForm) {
    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (window.currentLessons.length === 0) return alert("Curso vacío");

        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.textContent = "Guardando...";

        try {
            const courseData = {
                title: document.getElementById('title').value,
                desc: document.getElementById('desc').value,
                price: document.getElementById('price').value,
                tags: document.getElementById('tags').value.split(','),
                image: document.getElementById('image').value || 'https://via.placeholder.com/300',
                lessons: window.currentLessons,
                videoUrl: window.currentLessons[0].video || ''
            };

            const id = document.getElementById('courseId').value;
            if (id) await updateCourse(id, courseData);
            else await addCourse(courseData);

            alert("✓ Guardado");
            createForm.reset();
            window.currentLessons = [];
            renderLessonsUI();
            window.switchView('courses');
            loadDashboardData();
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            btn.disabled = false;
            btn.textContent = "Publicar";
        }
    });
}

// Type Switcher
const tSelect = document.getElementById('newLessonType');
if (tSelect) {
    tSelect.onchange = function () {
        document.querySelectorAll('.type-input').forEach(e => e.style.display = 'none');
        const t = this.value;
        if (t === 'video') document.getElementById('input-video').style.display = 'block';
        if (t === 'quiz') document.getElementById('input-quiz').style.display = 'block';
        if (t === 'pdf' || t === 'link') document.getElementById('input-url').style.display = 'block';
    };
}


// --- DATA LOADING ---
async function loadDashboardData() {
    console.log("Cargando Dashboard...");
    try {
        const [courses, users] = await Promise.all([getCourses(), getAllUsers()]);
        console.log("Datos cargados:", courses.length, "cursos", users.length, "usuarios");

        // Stats
        document.getElementById('stat-total-courses').textContent = courses.length;
        document.getElementById('stat-total-students').textContent = users.length;

        // Tabla Cursos
        const cBody = document.getElementById('coursesTableBody');
        cBody.innerHTML = '';
        courses.forEach(c => {
            cBody.innerHTML += `<tr>
                <td><b>${c.title}</b><br><small>${c.lessons?.length || 1} lecciones</small></td>
                <td>${c.price}</td>
                <td><button onclick="window.editCourse('${encodeURIComponent(JSON.stringify(c))}')">✏️</button></td>
             </tr>`;
        });

        // Tabla Students
        const sBody = document.getElementById('studentsTableBody');
        sBody.innerHTML = '';
        users.forEach(u => {
            sBody.innerHTML += `<tr>
                <td><img src="${u.photoURL || 'https://via.placeholder.com/30'}" width="30" style="border-radius:50%"> <b>${u.displayName || 'User'}</b></td>
                <td>${u.email}</td>
                <td><small>${u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : '-'}</small></td>
            </tr>`;
        });

    } catch (e) {
        console.error("Error Dashboard:", e);
    }
}

// Edit Helper Global
window.editCourse = (json) => {
    try {
        const c = JSON.parse(decodeURIComponent(json));
        window.switchView('create');

        document.getElementById('title').value = c.title;
        document.getElementById('desc').value = c.desc;
        document.getElementById('price').value = c.price;
        document.getElementById('tags').value = c.tags;
        document.getElementById('image').value = c.image;
        document.getElementById('courseId').value = c.id;
        document.getElementById('formTitle').textContent = "Editar: " + c.title;
        document.getElementById('cancelEditBtn').style.display = 'inline-block';

        window.currentLessons = c.lessons || [];
        if (!c.lessons && c.videoUrl) window.currentLessons = [{ title: 'Video', type: 'video', video: c.videoUrl }];

        renderLessonsUI();

    } catch (e) { console.error(e); }
};

document.getElementById('cancelEditBtn')?.addEventListener('click', () => {
    createForm.reset();
    window.currentLessons = [];
    renderLessonsUI();
    document.getElementById('courseId').value = '';
    document.getElementById('formTitle').textContent = 'Crear Nuevo Curso';
    document.getElementById('cancelEditBtn').style.display = 'none';
    window.switchView('courses');
});


// AUTH MONITOR
onAuthStateChanged(auth, async (user) => {
    if (user && user.email === "icarapia94@gmail.com") {
        console.log("Admin Logged In");

        // Sync Admin Profile
        setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: user.displayName || 'Admin',
            photoURL: user.photoURL,
            lastLogin: new Date().toISOString(),
            role: 'admin'
        }, { merge: true });

        // Load Data
        await loadDashboardData();

    } else {
        console.warn("No admin user detected");
    }
});
