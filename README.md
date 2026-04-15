# Frontend - Gestión de Notas

Aplicación frontend para gestión de notas de alumnos, desarrollada con React + Vite.

## Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080/api


## Cómo ejecutar con Docker
# Construir la imagen
docker build -t frontend-notas .

# Ejecutar el contenedor
docker run -d -p 3000:80 --name frontend-app frontend-notas

# Verificar que funciona
Abrir navegador en http://localhost:3000
