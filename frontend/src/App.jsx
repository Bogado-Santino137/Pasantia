import React, { useState } from 'react';
import Login from './pages/Login';
import Registro from './pages/Registro';
import DashboardTickets from './pages/DashboardTickets'; // <-- IMPORTANTE: Falta importar esto
import Perfil from './pages/Perfil';                     // <-- IMPORTANTE: Falta importar esto

export default function App() {
  // 1. DECLARACIÓN DE TODOS LOS ESTADOS (Siempre arriba de todo)
  const [usuario, setUsuario] = useState(null);
  const [vistaActual, setVistaActual] = useState('login');
  const [seccionActual, setSeccionActual] = useState('tickets'); 

  // 2. FUNCIONES DE CONTROL
  const handleLoginSuccess = (usuarioLogueado) => {
    setUsuario(usuarioLogueado);
  };

  const handleLogout = () => {
    setUsuario(null);
    setVistaActual('login');
    setSeccionActual('tickets');
  };

  // 3. LOGICA DE RENDERIZADO
  // Si el usuario ya inició sesión con éxito, mostramos el Panel Principal
  if (usuario) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#121212', color: 'white' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
          <h2>Sistema de Gestión de Tickets</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span>Usuario: <strong>{usuario.nombre} {usuario.apellido}</strong></span>
            
            {/* Botón para cambiar de sección interna */}
            <button onClick={() => setSeccionActual(seccionActual === 'tickets' ? 'perfil' : 'tickets')} style={{ padding: '6px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {seccionActual === 'tickets' ? 'Mi Perfil' : 'Ver Tickets'}
            </button>

            <button onClick={handleLogout} style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Cerrar Sesión
            </button>
          </div>
        </header>
        
        <main style={{ marginTop: '20px' }}>
          {seccionActual === 'tickets' ? (
            <DashboardTickets usuario={usuario} />
          ) : (
            <Perfil 
              usuario={usuario} 
              onPerfilActualizado={(u) => setUsuario(u)} 
              onVolver={() => setSeccionActual('tickets')} 
            />
          )}
        </main>
      </div>
    );
  }

  // Si no está logueado, mostramos Login o Registro según corresponda
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
