import React, { useState } from 'react';
import { authService } from '../services/authService';

export default function Perfil({ usuario, onPerfilActualizado, onVolver }) {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [apellido, setApellido] = useState(usuario.apellido);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    try {
      const usuarioActualizado = await authService.actualizarPerfil(usuario.id, nombre, apellido, email, password);
      setMensaje('¡Perfil actualizado con éxito!');
      onPerfilActualizado(usuarioActualizado); // Actualiza el estado global de App.jsx
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#1e1e1e', color: 'white' }}>
      <h3>Modificar Perfil</h3>
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
      {mensaje && <p style={{ color: '#28a745' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Apellido:</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Nueva Contraseña (opcional):</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Dejar vacío para no cambiar" style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#2d2d2d', color: 'white', border: '1px solid #444', borderRadius: '4px' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ flex: '1', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Guardar Cambios
          </button>
          <button type="button" onClick={onVolver} style={{ flex: '1', padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
