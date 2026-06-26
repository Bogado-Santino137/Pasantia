import React, { useState, useEffect } from 'react';
import { ticketService } from '../services/ticketService';

export default function DashboardTickets({ usuario }) {
  const [tickets, setTickets] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('Baja');
  const [estado, setEstado] = useState('Abierto'); 
  const [filtroEstado, setFiltroEstado] = useState(''); 
  const [error, setError] = useState('');
  const [idEdicion, setIdEdicion] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const cargarTickets = async () => {
    try {
      const data = await ticketService.listar(filtroEstado);
      setTickets(data);
    } catch (err) {
      setError('No se pudieron cargar los tickets.');
    }
  };

  useEffect(() => {
    cargarTickets();
  }, [filtroEstado]);

  const handleGuardarFormulario = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (idEdicion) {
        await ticketService.editar(idEdicion, { titulo, descripcion, prioridad, estado });
        setIdEdicion(null);
      } else {
        await ticketService.crear(titulo, descripcion, prioridad, usuario.id);
      }
      setTitulo('');
      setDescripcion('');
      setPrioridad('Baja');
      setEstado('Abierto');
      cargarTickets(); 
    } catch (err) {
      setError(err.message);
    }
  };

  const activarEdicion = (ticket) => {
    setIdEdicion(ticket.id);
    setTitulo(ticket.titulo);
    setDescripcion(ticket.descripcion);
    setPrioridad(ticket.prioridad);
    setEstado(ticket.estado);
  };

  const handleCerrarTicket = async (id) => {
    try {
      await ticketService.cerrar(id);
      cargarTickets();
    } catch (err) {
      setError('No se pudo cerrar el ticket.');
    }
  };

  const handleEliminarTicket = async (id) => {
    if (window.confirm("¿Estás seguro de que querés borrar físicamente este ticket?")) {
      try {
        await ticketService.eliminar(id);
        cargarTickets(); 
      } catch (err) {
        setError('No se pudo eliminar el ticket.');
      }
    }
  };

  const cancelarEdicion = () => {
    setIdEdicion(null);
    setTitulo('');
    setDescripcion('');
    setPrioridad('Baja');
    setEstado('Abierto');
  };

  const ticketsFiltrados = tickets.filter((t) => {
    const termino = busqueda.toLowerCase();
    return (
      t.titulo.toLowerCase().includes(termino) ||
      t.descripcion.toLowerCase().includes(termino)
    );
  });

  return (
    <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
      {/* SECCIÓN IZQUIERDA: FORMULARIO */}
      <div style={{ flex: '1', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxHeight: '520px', background: '#1e1e1e', color: 'white' }}>
        <h3>{idEdicion ? 'Editar Ticket' : 'Crear Nuevo Ticket'}</h3>
        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
        <form onSubmit={handleGuardarFormulario}>
          <div style={{ marginBottom: '10px' }}>
            <label>Título:</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: 'white' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Descripción:</label>
            <textarea 
  value={descripcion} 
  onChange={(e) => setDescripcion(e.target.value)} 
  required 
  rows="4" 
  style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: 'white', resize: 'none' }} 
/>

          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Prioridad:</label>
            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: 'white' }}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          
          {idEdicion && (
            <div style={{ marginBottom: '15px' }}>
              <label>Estado:</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: 'white' }}>
                <option value="Abierto">Abierto</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ flex: '1', padding: '10px', background: idEdicion ? '#ffc107' : '#007bff', color: idEdicion ? 'black' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {idEdicion ? 'Actualizar' : 'Guardar Ticket'}
            </button>
            {idEdicion && (
              <button type="button" onClick={cancelarEdicion} style={{ flex: '1', padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* SECCIÓN DERECHA: TABLA, FILTROS Y BARRA DE BÚSQUEDA */}
      <div style={{ flex: '2', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#1e1e1e', color: 'white' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Listado de Tickets</h3>
            <div>
              <label style={{ marginRight: '10px' }}>Filtrar por Estado:</label>
              <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #444', background: '#2d2d2d', color: 'white' }}>
                <option value="">Todos</option>
                <option value="Abierto">Abierto</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>
          </div>

          <div>
            <input 
              type="text" 
              placeholder="Buscar por título o descripción..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#2d2d2d', color: 'white', fontSize: '14px' }}
            />
          </div>

        </div>

        {ticketsFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '20px' }}>No hay tickets que coincidan con la búsqueda.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #444' }}>
                <th style={{ padding: '10px' }}>Título</th>
                <th style={{ padding: '10px' }}>Prioridad</th>
                <th style={{ padding: '10px' }}>Estado</th>
                <th style={{ padding: '10px' }}>Creador</th>
                <th style={{ padding: '10px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ticketsFiltrados.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '10px' }}>
                    <strong>{t.titulo}</strong>
                    <br />
                    <small style={{ color: '#aaa' }}>{t.descripcion}</small>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '12px', background: t.prioridad === 'Alta' ? '#dc3545' : t.prioridad === 'Media' ? '#ffc107' : '#28a745', color: t.prioridad === 'Media' ? 'black' : 'white' }}>
                      {t.prioridad}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>{t.estado}</td>
                  <td style={{ padding: '10px' }}><small>{t.usuario?.nombre || 'Anónimo'}</small></td>
                  <td style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button onClick={() => activarEdicion(t)} style={{ padding: '5px 8px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                        Editar
                      </button>
                      {t.estado !== 'Cerrado' && (
                        <button onClick={() => handleCerrarTicket(t.id)} style={{ padding: '5px 8px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                          Cerrar
                        </button>
                      )}
                      <button onClick={() => handleEliminarTicket(t.id)} style={{ padding: '5px 8px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
