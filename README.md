# Iván Carapia - Portafolio y Academia

Portafolio profesional con sistema de cursos integrado.

## 🚀 Características

- **Portafolio Personal** - CV, habilidades, proyectos
- **Academia de Cursos** - Videos, PDFs, Quizzes interactivos
- **Panel de Administración** - Gestión de cursos y estudiantes
- **Autenticación Google** - Login seguro con Firebase

## 🛠️ Tecnologías

- Node.js (servidor de rutas)
- Firebase (Auth + Firestore)
- Docker
- HTML/CSS/JS

## 📁 Estructura

```
├── public/              # Archivos públicos
│   ├── assets/         # CSS, JS, imágenes
│   └── pages/          # Páginas HTML
├── admin/              # Panel de administración
├── src/                # Código fuente modular
│   ├── config/        # Firebase config
│   ├── controllers/   # Lógica de negocio
│   └── models/        # Modelos de datos
├── server.js          # Servidor Node.js
├── Dockerfile         # Configuración Docker
└── docker-compose.yml
```

## 🏃 Ejecutar Localmente

```bash
# Con Docker
docker-compose up --build

# Abrir en navegador
http://localhost:3000
```

## 🌐 URLs

- `/` - Portafolio
- `/cursos` - Lista de cursos
- `/curso?id=X` - Aula virtual
- `/admin` - Panel de administración

## 👤 Autor

**Iván Carapia Barajas**
- Email: icarapia94@gmail.com
- LinkedIn: [ivan-carapia](https://linkedin.com/in/ivan-carapia)
- GitHub: [icarapia](https://github.com/icarapia)
