# Actividad 1 - Sistema de Gestión de Tickets

**Alumno:** Bogado, Santino  
**DNI:** 48474295  
**Fecha de Entrega:** 07/07/2026  

## 🚀 Tecnologías Utilizadas
* **Backend:** Java 17, Spring Boot 3.3.x, Spring Data JPA, API REST
* **Frontend:** React (Vite), JavaScript, HTML5/CSS3
* **Base de Datos:** PostgreSQL

## 📂 Arquitectura del Proyecto
El sistema fue desarrollado bajo una arquitectura en capas bien definida:
* **Backend:** `controller` (Endpoints REST), `service` (Lógica de negocio), `repository` (Acceso a datos vía JPA), `entity` (Modelos de base de datos) y `config` (Seguridad y CORS).
* **Frontend:** `pages` (Vistas de Login, Registro y Dashboard), `services` (Peticiones fetch HTTP).

## 🛠️ Instrucciones de Ejecución

### 1. Base de Datos
* Crear una base de datos en PostgreSQL llamada `gestion_tickets`.
* Ajustar las credenciales en `backend/src/main/resources/application.properties`.

### 2. Ejecutar el Backend
* Abrir la carpeta `backend` en la terminal.
* Ejecutar la aplicación desde la clase principal `TicketsApplication.java` (o mediante `./mvnw spring-boot:run`).

### 3. Ejecutar el Frontend
* Abrir la carpeta `frontend` en la terminal.
* Instalar dependencias con: `npm install`
* Iniciar el servidor de desarrollo con: `npm run dev`
* Abrir en el navegador: `http://localhost:5173`
