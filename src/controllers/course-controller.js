import { db, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, getDoc, updateDoc, setDoc } from '../config/firebase-config.js'; // Importamos updateDoc y setDoc
import { currentUser } from '../models/user.js';

// --- USER PROGRESS ---

export async function saveLessonProgress(userId, courseId, lessonIndex, score = null) {
    if (!userId || !courseId) return;

    const progressRef = doc(db, "users", userId, "course_progress", courseId);

    // Usamos setDoc con merge para no borrar datos previos
    const data = {
        lastUpdate: new Date().toISOString(),
        [`lesson_${lessonIndex}`]: {
            completed: true,
            score: score,
            date: new Date().toISOString()
        }
    };

    try {
        await setDoc(progressRef, data, { merge: true });
        console.log("Progreso guardado");
        return true;
    } catch (e) {
        console.error("Error guardando progreso:", e);
        return false;
    }
}

export async function getUserProgress(userId, courseId) {
    if (!userId || !courseId) return null;
    const progressRef = doc(db, "users", userId, "course_progress", courseId);
    try {
        const snap = await getDoc(progressRef);
        return snap.exists() ? snap.data() : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const coursesCollection = collection(db, "courses");

// ... (addCourse y getCourses siguen igual) ...

// === UPDATE (EDITAR) ===
export async function updateCourse(id, newData) {
    if (!currentUser.isAdmin()) throw new Error("ACCESO DENEGADO");

    try {
        const courseRef = doc(db, "courses", id);
        await updateDoc(courseRef, {
            ...newData,
            updatedAt: new Date()
        });
        return true;
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}

// ... (Resto del código) ...

export async function addCourse(courseData) {
    if (!currentUser.isAdmin()) throw new Error("ACCESO DENEGADO");

    // La validación de videoUrl ya no es obligatoria (usamos lessons array)
    try {
        const docRef = await addDoc(coursesCollection, {
            ...courseData,
            createdAt: new Date(),
            authorEmail: currentUser.get().email
        });
        console.log("Curso creado con ID:", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Firebase Error:", e);
        throw e;
    }
}

export async function getCourses() {
    console.log("📚 getCourses() llamado");
    try {
        const q = query(coursesCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const courses = [];
        querySnapshot.forEach((doc) => {
            courses.push({ id: doc.id, ...doc.data() });
        });
        console.log("✅ Cursos encontrados:", courses.length);
        return courses;
    } catch (error) {
        console.error("❌ Error en getCourses:", error);
        return []; // Retornar array vacío en vez de crash
    }
}

// Nueva función para el Player
export async function getCourseById(id) {
    const docRef = doc(db, "courses", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Curso no encontrado");
    }
}

export async function deleteCourse(id) {
    if (!currentUser.isAdmin()) throw new Error("ACCESO DENEGADO");
    if (confirm("¿Eliminar?")) {
        await deleteDoc(doc(db, "courses", id));
        return true;
    }
    return false;
}
