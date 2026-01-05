import { getCourses } from '/src/controllers/course-controller.js';

console.log("🚀 public-courses.js cargado");

async function renderCourses() {
    const grid = document.querySelector('.courses-grid');
    if (!grid) {
        console.error("No se encontró .courses-grid");
        return;
    }

    console.log("📚 Iniciando carga de cursos...");

    try {
        const courses = await getCourses();
        console.log("✅ Cursos obtenidos:", courses.length);

        // Limpiar loader
        grid.innerHTML = '';

        if (!courses || courses.length === 0) {
            // No hay cursos creados aún
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 80px 20px;">
                    <div style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;">📚</div>
                    <h3 style="color: white; margin-bottom: 10px;">Próximamente</h3>
                    <p style="color: var(--muted); font-size: 1.1rem;">
                        Los cursos están siendo preparados. ¡Vuelve pronto!
                    </p>
                </div>
            `;
            return;
        }

        // Renderizar cursos desde Firebase
        courses.forEach(course => {
            console.log("Curso:", course.title);
            const article = document.createElement('article');
            article.className = 'course-card';
            article.innerHTML = `
                <div class="course-thumb">
                    <img src="${course.image || ''}" alt="${course.title}" 
                         onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(45deg, #1e293b, #0f172a)';">
                    <span class="course-tag">${course.tags && course.tags[0] ? course.tags[0] : 'Curso'}</span>
                </div>
                <div class="course-body">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-desc">${course.desc || 'Sin descripción'}</p>
                    <div class="course-meta">
                        <div class="course-price">${course.price || 'Gratis'}</div>
                        <a href="/curso?id=${course.id}" class="enroll-btn">Inscribirse →</a>
                    </div>
                </div>
            `;
            grid.appendChild(article);
        });

    } catch (error) {
        console.error('❌ Error cargando cursos:', error);
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #ef4444;">
                <p>Error al cargar los cursos: ${error.message}</p>
                <p style="font-size: 0.8rem; color:#888; margin-top:10px;">Revisa la consola para más detalles.</p>
            </div>
        `;
    }
}

renderCourses();
