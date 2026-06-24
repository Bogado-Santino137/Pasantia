import React, { useState } from 'react';
import { authService } from '../services/authService';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    try {
      await authService.registro(nombre, apellido, email, password);
      setMensaje('¡Usuario registrado con éxito! Ya podés iniciar sesión.');
      setNombre(''); setApellido(''); setEmail(''); setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registro de Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre: </label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Apellido: </label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Contraseña: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
}
