import React, { useState } from 'react';
import Login from './pages/Login';
import Registro from './pages/Registro';

export default function App() {
  // Estado para saber si hay un usuario logueado en el sistema
  const [usuario, setUsuario] = useState(null);
  // Estado para alternar la vista entre 'login' y 'registro'
  const [vistaActual, setVistaActual] = useState('login');

  // Función que se ejecuta cuando el Login de la API responde OK
  const handleLoginSuccess = (usuarioLogueado) => {
    setUsuario(usuarioLogueado);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setUsuario(null);
    setVistaActual('login');
  };

  // 1. Si el usuario ya inició sesión con éxito, mostramos el Panel de Tickets
  if (usuario) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <h1>Sistema de Gestión de Tickets</h1>
          <div>
            <span style={{ marginRight: '15px' }}>Hola, <strong>{usuario.nombre} {usuario.apellido}</strong></span>
            <button onClick={handleLogout} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cerrar Sesión
            </button>
          </div>
        </header>
        
        <main style={{ marginTop: '20px' }}>
          <h3>Panel de Control (Próximo paso: CRUD de Tickets)</h3>
          <p>Aquí listaremos, crearemos y editaremos los tickets relacionales de PostgreSQL.</p>
        </main>
      </div>
    );
  }

  // 2. Si no está logueado, mostramos Login o Registro según corresponda
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {vistaActual === 'login' ? (
        <div>
          <Login onLoginSuccess={handleLoginSuccess} />
          <p style={{ textAlign: 'center' }}>
            ¿No tenés cuenta?{' '}
            <button onClick={() => setVistaActual('registro')} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
              Registrate acá
            </button>
          </p>
        </div>
      ) : (
        <div>
          <Registro />
          <p style={{ textAlign: 'center' }}>
            ¿Ya tenés una cuenta?{' '}
            <button onClick={() => setVistaActual('login')} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
              Iniciá sesión acá
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
