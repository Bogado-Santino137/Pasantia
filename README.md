# Actividad 1 - Sistema de Gestión de Tickets

**Alumno:** Bogado, Santino  
**DNI:** 48474295  
**Fecha de Entrega:** 07/07/2026  

## Descripción del Proyecto
Este proyecto consiste en una aplicación web integral para la administración de tickets de soporte técnico. El sistema permite el control de flujos mediante estados y prioridades, garantizando un entorno multiusuario relacional y seguro.

## Tecnologías Utilizadas
* **Backend:** Java 17, Spring Boot 3.4.3, Spring Data JPA, API REST
* **Frontend:** React (Vite), JavaScript, HTML5 / CSS3
* **Base de Datos:** PostgreSQL 

## Arquitectura del Sistema
La aplicación fue diseñada siguiendo estrictamente una arquitectura en capas, garantizando la separación de responsabilidades exigida:

### Backend (Spring Boot)
* `entity/`: Modelado de las tablas relacionales de la base de datos mediante JPA/Hibernate.
* `repository/`: Interfaces de persistencia de datos orientadas a consultas nativas y automatizadas.
* `service/`: Capa de lógica de negocio, validaciones y control de excepciones del sistema.
* `controller/`: Controladores REST que exponen los endpoints estructurados en formato JSON.
* `dto/`: Objetos de transferencia de datos utilizados para la abstracción de las entidades del modelo.
* `config/`: Centralización de configuraciones generales del sistema (CORS, accesos).

### Frontend (React)
* `pages/`: Vistas de la aplicación (Inicio de sesión, Registro, Gestión de Perfil y Dashboard).
* `services/`: Módulos de conexión e interactividad asíncrona mediante peticiones HTTP Fetch.
* `components/`: Elementos e interfaces gráficas modulares reutilizables.
* `hooks/`: Gestión encapsulada de estados lógicos y reactivos de los componentes.

## Funcionalidades Implementadas (Ciclo ABM Completo)
1. **Gestión de Usuarios:** Registro seguro de cuentas, inicio de sesión (Login) con validación de credenciales en base de datos y modificación de datos de perfil en tiempo real.
2. **Alta de Tickets:** Formulario dinámico con asignación de título, descripción y prioridades (Baja, Media, Alta).
3. **Persistencia Relacional:** Asociación lógica estricta de cada ticket al ID del usuario creador (Relación Muchos a Uno).
4. **Listado y Filtros:** Renderizado de registros con selectores de filtrado avanzados según su estado (Abierto, En Proceso, Cerrado).
5. **Tipeo Dinámico:** Barra de búsqueda en tiempo real que filtra las coincidencias por título o descripción en memoria.
6. **Modificación y Cierre:** Soporte para edición de contenido de registros abiertos y opción rápida de baja lógica (Cerrar).
7. **Baja Física por URL Dinámica:** Implementación del método DELETE para la remoción definitiva de registros según su ID.

## Instrucciones de Despliegue Local

### 1. Base de Datos
* Crear una base de datos vacía en PostgreSQL denominada `gestion_tickets`.
* Importar y ejecutar el script del archivo `gestion_tickets.sql` en la Query Tool para restaurar las tablas y los datos relacionales de prueba.

### 2. Ejecutar el Backend
* Abrir el directorio `backend` en el entorno de desarrollo.
* Verificar las credenciales en `src/main/resources/application.properties`.
* Ejecutar la clase principal `TicketsApplication.java` para levantar el servidor en el puerto 8080.

### 3. Ejecutar el Frontend
* Abrir la carpeta `frontend` en la consola de comandos.
* Instalar las dependencias del proyecto: `npm install`
* Iniciar el servidor de desarrollo local: `npm run dev`
* Acceder a la aplicación web a través de la dirección: `http://localhost:5173`
