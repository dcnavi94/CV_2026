import { getCourseById, saveLessonProgress, getUserProgress } from './controllers/course-controller.js';
import { currentUser } from './models/user.js';
import { onAuthStateChanged, auth } from './config/firebase-config.js';

let currentCourse = null;
let userProgress = null; // { lastUpdate, lesson_X: { completed: true, score: 8.5 } }

const TYPE_ICONS = {
    'video': '🎥',
    'quiz': '📝',
    'pdf': '📄',
    'link': '🔗'
};

async function initPlayer() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');

    if (!courseId) {
        setupAdminControls(null);
        return;
    }

    // Auth Listener principal
    onAuthStateChanged(auth, async (user) => {
        try {
            currentCourse = await getCourseById(courseId);

            // Cargar Progreso de Usuario si está logueado
            if (user) {
                userProgress = await getUserProgress(user.uid, courseId) || {};
            }

            document.title = `${currentCourse.title} - Aula Virtual`;
            document.querySelector('.sidebar-header h4').textContent = currentCourse.title;

            renderSidebar(currentCourse);

            // Calcular % completado
            updateProgressUI();

            // Cargar primera lección
            if (currentCourse.lessons && currentCourse.lessons.length > 0) {
                loadLesson(0);
            } else if (currentCourse.videoUrl) {
                loadLegacyVideo(currentCourse);
            }

            // Barra Admin
            if (user && currentUser.isAdmin()) setupAdminControls(currentCourse);
        } catch (error) {
            handleError(error);
        }
    });
}

function updateProgressUI() {
    if (!currentCourse.lessons) return;
    const total = currentCourse.lessons.length;
    let completed = 0;

    // Contar completadas
    if (userProgress) {
        Object.keys(userProgress).forEach(k => {
            if (k.startsWith('lesson_') && userProgress[k].completed) completed++;
        });
    }

    const percent = Math.round((completed / total) * 100) || 0;

    // Buscar la barra de progreso en el DOM (en sidebar)
    const bar = document.querySelector('.sidebar-header > div > div'); // div verde dentro de div gris
    const text = document.querySelector('.sidebar-header > div:last-child');

    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}% Completado`;
}

function renderSidebar(course) {
    const list = document.querySelector('.module-list');
    list.innerHTML = '';

    const header = document.createElement('li');
    header.className = 'module-header';
    header.textContent = "Contenido del Curso";
    list.appendChild(header);

    const lessons = course.lessons || [];

    lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.className = 'lesson-item';
        if (index === 0) li.classList.add('active');

        // Check si completado
        const isCompleted = userProgress && userProgress[`lesson_${index}`]?.completed;
        const iconChar = isCompleted ? '✅' : (TYPE_ICONS[lesson.type || 'video']);

        li.innerHTML = `
            <span style="margin-right:8px; font-size:1.1rem;">${iconChar}</span>
            <div style="flex:1;">
                <div>${lesson.title}</div>
                ${isCompleted && userProgress[`lesson_${index}`].score != null
                ? `<div style="font-size:0.7rem; color:#30d158;">Nota: ${userProgress[`lesson_${index}`].score}/10</div>`
                : ''}
            </div>
        `;

        li.id = `lesson-item-${index}`;
        li.onclick = () => {
            document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            loadLesson(index);
            if (window.innerWidth < 900) window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        list.appendChild(li);
    });
}

function loadLesson(index) {
    if (!currentCourse || !currentCourse.lessons) return;
    const lesson = currentCourse.lessons[index];
    const type = lesson.type || 'video';
    const container = document.getElementById('videoContainer');

    // Metadata
    document.querySelector('.lesson-title').textContent = lesson.title;
    const descContainer = document.querySelector('.lesson-desc');
    if (descContainer) descContainer.innerHTML = ''; // Limpiar

    container.innerHTML = '';
    container.style.display = 'block';

    // === RENDERIZADORES ===

    if (type === 'video') {
        container.innerHTML = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${lesson.video}?rel=0&modestbranding=1"
                frameborder="0" allow="accelerometer; autoplay; wallet; encrypted-media; gyroscope" allowfullscreen>
            </iframe>`;
        addCompleteButton(container, index);
    }
    else if (type === 'pdf') {
        container.innerHTML = `
            <iframe src="${lesson.url}" width="100%" height="600px" style="border:none; background:white;"></iframe>`;
        addCompleteButton(container, index);
    }
    else if (type === 'link') {
        container.innerHTML = `
            <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#111; color:white; padding:40px; text-align:center;">
                <div style="font-size:4rem; margin-bottom:20px;">🔗</div>
                <h2>Recurso Externo</h2>
                <a href="${lesson.url}" target="_blank" onclick="markComplete(${index})" style="background:#30d158; color:black; padding:15px 30px; text-decoration:none; font-weight:bold; border-radius:8px; font-size:1.1rem; margin-top:20px;">
                    Abrir Recurso ↗
                </a>
                <p style="color:#666; font-size:0.8rem; margin-top:10px;">Se marcará como visto al abrir.</p>
            </div>`;
    }
    else if (type === 'quiz') {
        // Si ya lo hizo, mostrar resultado
        const attempt = userProgress && userProgress[`lesson_${index}`];
        if (attempt && attempt.completed) {
            renderQuizResult(container, attempt.score, index);
        } else {
            renderQuiz(lesson, container, index);
        }
    }
}

function addCompleteButton(container, index) {
    // Solo agregar si NO está completado
    if (userProgress && userProgress[`lesson_${index}`]?.completed) return;

    const btn = document.createElement('button');
    btn.textContent = "✅ Marcar como Visto";
    btn.style.cssText = "display:block; margin:20px auto; padding:10px 20px; background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2); border-radius:6px; cursor:pointer;";
    btn.onclick = () => markComplete(index);
    // Inyectar FUERA del iframe, en el contenedor description mejor
    const desc = document.querySelector('.lesson-desc');
    desc.appendChild(btn);
}

// LOGICA GLOBAL PARA MARCAR COMPLETADO
window.markComplete = async (index, score = null) => {
    const user = auth.currentUser;
    if (!user) return; // Solo si logueado

    await saveLessonProgress(user.uid, currentCourse.id, index, score);

    // Actualizar estado local
    if (!userProgress) userProgress = {};
    userProgress[`lesson_${index}`] = { completed: true, score: score };

    // Actualizar UI Sidebar
    renderSidebar(currentCourse);
    updateProgressUI();

    // Recargar lección actual para actualizar botones
    const currentLi = document.getElementById(`lesson-item-${index}`);
    if (currentLi && currentLi.classList.contains('active')) {
        // Si es video/pdf, ocultamos el botón de marcar
        const btns = document.querySelector('.lesson-desc button');
        if (btns) btns.style.display = 'none';
    }
};

function renderQuiz(lesson, container, index) {
    const questions = lesson.questions || [];
    container.style.backgroundColor = "#111"; // Fondo oscuro
    container.style.color = "white";
    container.style.padding = "40px";
    container.style.overflowY = "auto";
    container.style.display = "block";

    let html = `
        <div style="max-width:700px; margin:0 auto;">
            <h2 style="color:#30d158; margin-bottom:10px;">📝 Evaluación: ${lesson.title}</h2>
            <p style="color:#888; margin-bottom:30px;">Responde correctamente para aprobar.</p>
            <form id="quizForm">
    `;

    questions.forEach((q, qIndex) => {
        html += `
            <div class="question-block" style="margin-bottom:30px; background:rgba(255,255,255,0.05); padding:20px; border-radius:12px;">
                <h3 style="font-size:1.1rem; margin-bottom:15px;">${qIndex + 1}. ${q.question}</h3>
                <div class="options">
        `;
        q.options.forEach((opt, oIndex) => {
            html += `
                <label style="display:block; padding:10px; margin-bottom:8px; border:1px solid rgba(255,255,255,0.1); border-radius:8px; cursor:pointer;">
                    <input type="radio" name="q_${qIndex}" value="${oIndex}" required style="margin-right:10px;"> ${opt}
                </label>
            `;
        });
        html += `</div></div>`;
    });

    html += `
            <button type="submit" style="width:100%; padding:15px; background:#30d158; color:black; font-weight:bold; border:none; border-radius:8px; font-size:1.1rem; cursor:pointer; margin-top:20px;">
                Finalizar y Calcular Nota
            </button>
            </form>
        </div>
    `;
    container.innerHTML = html;

    document.getElementById('quizForm').addEventListener('submit', (e) => {
        e.preventDefault();

        let correctCount = 0;
        const total = questions.length;
        const formData = new FormData(e.target);

        // Calcular Nota
        questions.forEach((q, i) => {
            const selected = parseInt(formData.get(`q_${i}`));
            if (selected === q.correct) correctCount++;
        });

        // Escala 0 a 10
        const finalScore = parseFloat(((correctCount / total) * 10).toFixed(1));

        // Guardar y Mostrar
        markComplete(index, finalScore);
        renderQuizResult(container, finalScore, index);
    });
}

function renderQuizResult(container, score, index) {
    const passed = score >= 6; // Aprobado con 6
    const color = passed ? '#30d158' : '#ef4444';
    const msg = passed ? '¡Felicidades! Has aprobado.' : 'No has alcanzado la nota mínima.';

    container.innerHTML = `
        <div style="height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:40px;">
            <div style="font-size:5rem; margin-bottom:20px;">${passed ? '🏆' : '📚'}</div>
            <h1 style="font-size:3rem; margin:0; color:${color};">${score}/10</h1>
            <h3 style="margin-top:10px;">${msg}</h3>
            
            ${!passed ? `<button onclick="loadLesson(${index})" style="margin-top:20px; padding:10px 20px; background:rgba(255,255,255,0.1); border:1px solid white; color:white; border-radius:6px; cursor:pointer;">Intentar de nuevo</button>` : ''}
        </div>
    `;
}

function loadLegacyVideo(course) {
    // ... Legacy ...
}

function setupAdminControls(course) {
    // ... Admin controls ...
    if (document.getElementById('adminToolbar')) return;
    const container = document.querySelector('.course-content');
    const toolbar = document.createElement('div');
    toolbar.id = "adminToolbar";
    toolbar.style.cssText = `background:linear-gradient(90deg, #30d15822, transparent); border-left:4px solid #30d158; padding:15px; margin-bottom:20px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;`;
    toolbar.innerHTML = `
        <div><strong>Modo Instructor</strong></div>
        ${course ? `<a href="admin.html?edit=${course.id}" style="color:white; text-decoration:underline;">Editar Curso</a>` : ''}
    `;
    container.prepend(toolbar);
}

function handleError(error) {
    console.error(error);
}

document.addEventListener('DOMContentLoaded', initPlayer);
