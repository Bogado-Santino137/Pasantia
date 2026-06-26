# Manual Técnico y Guía de Extensión del Sistema

Este documento detalla la infraestructura técnica, la especificación de rutas de la API REST y el funcionamiento de la aplicación Sistema de Gestión de Tickets. Sirve como guía de referencia para auditorías de código y para desarrolladores que deseen expandir el software dentro de la arquitectura establecida.

---

## 1. Arquitectura de Software y Especificación de Rutas

La aplicación web opera bajo un modelo desacoplado donde el Frontend (React) consume servicios de un Backend (Spring Boot) conectado a una base de datos relacional (PostgreSQL). A continuación, se detallan las operaciones disponibles y los endpoints específicos del Backend que se ejecutan en cada componente.

### A. Módulo de Autenticación y Gestión de Usuarios
*   **Registro de Cuentas:** Permite dar de alta nuevos operadores en el sistema.
    *   **Ruta del Backend:** `POST http://localhost:8080/api/usuarios/registro`
    *   **Procesamiento:** El servidor recibe un objeto JSON con Nombre, Apellido, Email y Contraseña. Valida en el repositorio que el correo no exista previamente para evitar duplicados. Asigna de forma automática el ID autoincremental, genera la marca de tiempo de creación y persiste el registro en la tabla `usuarios`.
*   **Inicio de Sesión (Login):** Valida las credenciales de acceso contra los registros de la base de datos.
    *   **Ruta del Backend:** `POST http://localhost:8080/api/usuarios/login`
    *   **Procesamiento:** Si las credenciales coinciden, el servidor retorna un estado HTTP 200 junto con el objeto del usuario completo. React almacena esta estructura en memoria para autorizar el acceso a las vistas protegidas. Si los datos son erróneos, el controlador responde con un estado HTTP 401 (Unauthorized).
*   **Modificación de Datos de Perfil:** Edición de la información personal del usuario activo.
    *   **Ruta del Backend:** `PUT http://localhost:8080/api/usuarios/{id}`
    *   **Procesamiento:** Modifica las columnas Nombre, Apellido y Email correspondientes al `{id}` enviado como parámetro de ruta dinámico. Si el campo de contraseña contiene texto, actualiza la clave de acceso en la misma operación.

### B. Módulo de Gestión de Tickets (Dashboard)
*   **Alta de Tickets:** Creación de nuevos reportes de soporte técnico.
    *   **Ruta del Backend:** `POST http://localhost:8080/api/tickets/usuario/{usuarioId}`
    *   **Procesamiento:** Extrae el `{usuarioId}` dinámicamente desde el estado del usuario logueado en el frontend. Establece de forma estricta la relación Muchos a Uno (`@ManyToOne`) en la base de datos, inicializa el estado por defecto en "Abierto", captura la fecha y hora actual, y guarda el registro.
*   **Listado General:** Renderizado de todos los tickets existentes en el sistema.
    *   **Ruta del Backend:** `GET http://localhost:8080/api/tickets`
    *   **Procesamiento:** Retorna una colección en formato JSON con la totalidad de las filas de la tabla `tickets`. Incluye los datos del usuario creador mediante una estrategia de carga eager optimizada para la visualización.
*   **Filtrado por Estado:** Segmentación de tickets a través del selector desplegable de la interfaz.
    *   **Ruta del Backend:** `GET http://localhost:8080/api/tickets?estado={valor_estado}`
    *   **Comportamiento:** Intercepta el parámetro de consulta opcional en la URL y ejecuta métodos de consulta derivados en el repositorio para retornar únicamente los tickets que coincidan con el estado enviado (Abierto, En Proceso o Cerrado).
*   **Modificación de Contenido:** Actualización de campos de texto del ticket.
    *   **Ruta del Backend:** `PUT http://localhost:8080/api/tickets/{id}`
    *   **Procesamiento:** Recibe las modificaciones de Título, Descripción, Prioridad y Estado asociadas al `{id}` del ticket. Sobreescribe los valores en la base de datos y refresca la vista del frontend.
*   **Baja Lógica (Cerrar Ticket):** Finalización rápida de un reporte desde la tabla.
    *   **Ruta del Backend:** `PUT http://localhost:8080/api/tickets/{id}/cerrar`
    *   **Procesamiento:** Altera exclusivamente el atributo de estado a "Cerrado" para el registro apuntado por el `{id}`, inhabilitando el botón de cierre en la interfaz y preservando el registro físico para mantener la integridad histórica.
*   **Baja Física (Eliminar por URL Dinámica):** Remoción permanente de un ticket.
    *   **Ruta del Backend:** `DELETE http://localhost:8080/api/tickets/{id}`
    *   **Procesamiento:** Utiliza una variable de ruta dinámica para identificar el registro por su `{id}` y ejecuta una sentencia de borrado directo (`DELETE`) sobre la tabla en PostgreSQL, removiendo el objeto por completo.

---

## 2. Guía de Extensión Tecnológica y Desarrollo de Nuevas Funciones

El sistema se rige bajo una arquitectura en capas bien definida que separa la interfaz de usuario, la lógica de negocio y la persistencia de datos. Para incorporar nuevas entidades o características adicionales (como un módulo de comentarios adjunto a los tickets), se debe seguir estrictamente la siguiente secuencia de desarrollo a través de los directorios del proyecto.

### Fase 1: Desarrollo en el Backend (Spring Boot)

Para expandir el núcleo del servidor, se debe avanzar de forma ordenada desde la base de datos hacia los endpoints expuestos:

1.  **Directorio entity/:** Crear la clase Java que representará la nueva tabla en PostgreSQL. Debe incluir las anotaciones `@Entity` y `@Table(name = "nombre_tabla")`. Se deben definir los identificadores primarios mediante `@Id` y `@GeneratedValue(strategy = GenerationType.IDENTITY)`. Las relaciones lógicas relacionales con las tablas existentes se deben estructurar mediante anotaciones JPA (`@ManyToOne`, `@OneToMany`) y su respectiva columna de unión `@JoinColumn`.
2.  **Directorio repository/:** Declarar una interfaz que extienda de `JpaRepository<NombreClaseEntity, Long>`. De este modo, la capa hereda inmediatamente todos los métodos nativos de persistencia (guardar, listar, eliminar). Si se requieren filtros personalizados, se definen aquí bajo las convenciones de Spring Data (por ejemplo: `List<Objeto> findByTicketId(Long ticketId)`).
3.  **Directorio dto/:** Diseñar las clases de Objeto de Transferencia de Datos (*Data Transfer Object*). Su propósito es moldear el formato JSON de entrada y salida, aislando las entidades complejas de la base de datos para prevenir ciclos de serialización infinita o la exposición innecesaria de propiedades sensibles del modelo.
4.  **Directorio service/:** Crear la clase de servicios anotada con la etiqueta `@Service`. En este componente se inyecta el repositorio correspondiente a través de su constructor. Aquí se programa la lógica de negocio dura, aplicando validaciones previas, manejo de excepciones personalizadas y consistencia de datos antes de ordenar el guardado en la base de datos.
5.  **Directorio controller/:** Desarrollar la API REST anotada con `@RestController` y establecer la ruta base de acceso con `@RequestMapping("/api/recurso")`. Se exponen los métodos de acceso público asociados a los verbos HTTP estándares (`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`). Estos métodos capturan las peticiones entrantes, delegan el procesamiento a la capa de servicios y retornan las respuestas estructuradas dentro de un objeto contenedor `ResponseEntity`.

### Fase 2: Desarrollo en el Frontend (React)

Una vez habilitados los nuevos recursos en la API de Spring Boot, se procede con su consumo e integración visual en la interfaz de usuario:

1.  **Directorio services/:** Crear un archivo JavaScript independiente (por ejemplo, `nuevoService.js`) encargado de centralizar las funciones asíncronas. Se utiliza la API nativa `fetch` para realizar las conexiones de red hacia el backend, configurando adecuadamente los verbos de solicitud, las cabeceras de contenido JSON y decodificando las respuestas del servidor de forma controlada.
2.  **Directorio hooks/:** Para evitar la sobrecarga de código e instrucciones complejas dentro de las pantallas de la interfaz, se recomienda encapsular las llamadas de los servicios, el control de errores en red y el almacenamiento de variables de estado de React (`useState`, `useEffect`) dentro de funciones o hooks personalizados (por ejemplo, `useNuevoHook.js`), exportando únicamente los métodos operativos y los datos procesados.
3.  **Directorio components/ y pages/:** Construir los elementos visuales requeridos para la interacción del usuario. Se consumen los datos expuestos por el hook o el servicio de control, se procesan los arrays de datos dinámicos mediante iteradores de JavaScript (`.map()`) y se inyecta la lógica interactiva (como la barra de filtrado dinámico por tipeo implementada en el listado de tickets) dentro del renderizado de componentes final.
