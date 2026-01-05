/**
 * Servidor Local con Sistema de Rutas
 * - Previene acceso directo a .html
 * - Rutas amigables (/cursos, /admin, etc.)
 * - Página 404 personalizada
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Mapeo de rutas amigables a archivos reales
const routes = {
    '/': '/public/index.html',
    '/inicio': '/public/index.html',
    '/cursos': '/public/pages/cursos.html',
    '/curso': '/public/pages/curso-player.html',
    '/admin': '/admin/index.html',
    '/admin/': '/admin/index.html',
    // New Routes
    '/curso-detalle': '/public/pages/curso-detalle.html',
    '/pages/curso-detalle.html': '/public/pages/curso-detalle.html',
    '/alumno': '/public/pages/alumno.html',
    '/pages/alumno.html': '/public/pages/alumno.html',
    '/pages/curso-player.html': '/public/pages/curso-player.html'
};

// Tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0]; // Ignorar query strings

    console.log(`[${new Date().toISOString()}] ${req.method} ${urlPath}`);

    let filePath;

    // 1. REVISAR RUTAS PERMITIDAS PRIMERO (Rutas Amigables o Excepciones)
    if (routes[urlPath]) {
        filePath = path.join(__dirname, routes[urlPath]);
    } else {
        // 2. SI NO ES RUTA PERMITIDA, APLICAR BLOQUEO A .HTML DIRECTO
        if (urlPath.endsWith('.html')) {
            res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html lang="es">
                <head><title>Acceso Denegado</title>
                <style>
                    body { font-family: system-ui; background: #0a0a0a; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    .container { text-align: center; }
                    h1 { font-size: 4rem; margin: 0; color: #ef4444; }
                    p { color: #888; }
                    a { color: #30d158; }
                </style>
                </head>
                <body>
                    <div class="container">
                        <h1>403</h1>
                        <p>Acceso directo a archivos .html no permitido.</p>
                        <p><a href="/">Ir al Inicio</a></p>
                    </div>
                </body>
                </html>
            `);
            return;
        }

        // 3. RESOLVER ARCHIVOS ESTÁTICOS (CSS, JS, IMGs)
        filePath = path.join(__dirname, urlPath);

        // Si no existe directo, intentar en /public
        if (!fs.existsSync(filePath)) {
            const publicPath = path.join(__dirname, 'public', urlPath);
            if (fs.existsSync(publicPath)) {
                filePath = publicPath;
            }
        }
    }

    // 3. LEER Y SERVIR ARCHIVO
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 404 - Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head><title>Página no encontrada</title>
                    <style>
                        body { font-family: system-ui; background: #0a0a0a; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                        .container { text-align: center; }
                        h1 { font-size: 6rem; margin: 0; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                        p { color: #888; font-size: 1.2rem; }
                        a { display: inline-block; margin-top: 20px; padding: 12px 30px; background: #30d158; color: black; text-decoration: none; border-radius: 8px; font-weight: bold; }
                    </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>404</h1>
                            <p>La página que buscas no existe.</p>
                            <a href="/">Volver al Inicio</a>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end('Error interno del servidor');
            }
            return;
        }

        // Determinar tipo MIME
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('╔═══════════════════════════════════════════════════╗');
    console.log('║     🚀 SERVIDOR DE DESARROLLO ACTIVO              ║');
    console.log('╠═══════════════════════════════════════════════════╣');
    console.log(`║  → http://localhost:${PORT}                          ║`);
    console.log(`║  → http://localhost:${PORT}/cursos                   ║`);
    console.log(`║  → http://localhost:${PORT}/admin                    ║`);
    console.log('╚═══════════════════════════════════════════════════╝');
    console.log('');
});
