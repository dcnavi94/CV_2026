"""
Servidor Python con Sistema de Rutas
- Bloquea acceso directo a .html  
- Rutas amigables (/cursos, /admin, etc.)
- Páginas 403/404 personalizadas
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse, unquote

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Mapeo de rutas amigables a archivos reales
ROUTES = {
    '/': 'public/index.html',
    '/inicio': 'public/index.html',
    '/cursos': 'public/pages/cursos.html',
    '/curso': 'public/pages/curso-player.html',
    '/admin': 'admin/index.html',
}

# Tipos MIME
MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
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
}

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parsear URL (ignorar query string para rutas, pero pasarlo al archivo)
        parsed = urlparse(self.path)
        url_path = unquote(parsed.path)
        
        print(f"[REQUEST] {url_path}")
        
        # 1. BLOQUEAR ACCESO DIRECTO A .HTML
        if url_path.endswith('.html'):
            self.send_error_page(403, "Acceso Denegado", "No está permitido acceder directamente a archivos .html")
            return
        
        # 2. RESOLVER RUTA
        if url_path in ROUTES:
            file_path = os.path.join(BASE_DIR, ROUTES[url_path])
        else:
            # Archivo estático (CSS, JS, imágenes)
            file_path = os.path.join(BASE_DIR, url_path.lstrip('/'))
        
        # 3. SERVIR ARCHIVO
        if os.path.isfile(file_path):
            self.serve_file(file_path)
        else:
            self.send_error_page(404, "Página no encontrada", f"La ruta '{url_path}' no existe.")
    
    def serve_file(self, file_path):
        ext = os.path.splitext(file_path)[1].lower()
        content_type = MIME_TYPES.get(ext, 'application/octet-stream')
        
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
            
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', len(content))
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error_page(500, "Error del Servidor", str(e))
    
    def send_error_page(self, code, title, message):
        color = "#ef4444" if code == 403 else "#667eea"
        html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <style>
        body {{ font-family: system-ui, sans-serif; background: #0a0a0a; color: white; 
               display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }}
        .container {{ text-align: center; }}
        h1 {{ font-size: 6rem; margin: 0; background: linear-gradient(135deg, {color}, #764ba2); 
              -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
        p {{ color: #888; font-size: 1.2rem; }}
        a {{ display: inline-block; margin-top: 20px; padding: 12px 30px; background: #30d158; 
             color: black; text-decoration: none; border-radius: 8px; font-weight: bold; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{code}</h1>
        <p>{message}</p>
        <a href="/">Volver al Inicio</a>
    </div>
</body>
</html>"""
        
        self.send_response(code)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(html.encode('utf-8'))
    
    def log_message(self, format, *args):
        # Silenciar logs por defecto (comentar para debug)
        pass

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print("")
        print("╔═══════════════════════════════════════════════════╗")
        print("║     🚀 SERVIDOR DE DESARROLLO ACTIVO              ║")
        print("╠═══════════════════════════════════════════════════╣")
        print(f"║  → http://localhost:{PORT}                          ║")
        print(f"║  → http://localhost:{PORT}/cursos                   ║")
        print(f"║  → http://localhost:{PORT}/admin                    ║")
        print("╚═══════════════════════════════════════════════════╝")
        print("")
        httpd.serve_forever()
