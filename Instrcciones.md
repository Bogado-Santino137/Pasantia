======================================================================
INSTRUCCIONES PARA EJECUTAR EL PROYECTO EN ENTORNO LOCAL
======================================================================
Alumno: Bogado, Santino
Proyecto: Sistema de Gestión de Tickets (Spring Boot + React + PostgreSQL)

Siga los siguientes pasos en orden para levantar la aplicación:

----------------------------------------------------------------------
PASO 1: LEVANTAR LA BASE DE DATOS (PostgreSQL)
----------------------------------------------------------------------
1. Abra pgAdmin 4 (o su gestor de PostgreSQL preferido).
2. Cree una base de datos vacía llamada exactamente: gestion_tickets
3. Haga clic derecho sobre la base de datos creada y seleccione "Query Tool".
4. Abra o copie el contenido del archivo "gestion_tickets.sql" adjunto en este repositorio, péguelo en la consola de consultas y presione "Execute" (F5).
   -> Esto creará automáticamente las tablas 'usuarios' y 'tickets' con datos relacionales de prueba.

----------------------------------------------------------------------
PASO 2: CONFIGURACIÓN Y EJECUCIÓN DEL BACKEND (Spring Boot)
----------------------------------------------------------------------
1. Abra la carpeta "backend" con su IDE (se recomienda Visual Studio Code).
2. Diríjase al archivo de propiedades: 
   backend/src/main/resources/application.properties
3. Asegúrese de ajustar la contraseña de su PostgreSQL local en la línea:
   spring.datasource.password=SU_CONTRASEÑA_AQUI
4. Abra la clase principal: 
   backend/src/main/java/com/tickets/TicketsApplication.java
5. Haga clic en el botón flotante "Run" de su IDE para compilar e iniciar el servidor.
   -> El backend quedará escuchando en el puerto estándar: http://localhost:8080

----------------------------------------------------------------------
PASO 3: CONFIGURACIÓN Y EJECUCIÓN DEL FRONTEND (React + Vite)
----------------------------------------------------------------------
1. Abra una terminal de comandos del sistema (CMD / Command Prompt) o la integrada de su IDE.
2. Muévase de forma directa hacia la carpeta del frontend:
   cd frontend
3. Instale todos los módulos de Node necesarios ejecutando:
   npm install
4. Inicie el servidor de desarrollo de Vite ejecutando:
   npm run dev
5. Abra su navegador web e ingrese a la dirección local suministrada por la consola:
   http://localhost:5173

----------------------------------------------------------------------
PASO 4: DATOS DE ACCESO PARA PRUEBAS (LOGIN)
----------------------------------------------------------------------
* Si restauró el archivo .sql provisto, puede iniciar sesión directamente:
  - Email: el_email_que_usaste@ejemplo.com (O el que figure en la tabla usuarios)
  - Contraseña: tu_contraseña

* Alternativamente, puede registrar un nuevo usuario desde la misma interfaz haciendo clic en "Registrate acá".
======================================================================
