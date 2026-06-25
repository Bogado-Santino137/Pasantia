const API_URL = "http://localhost:8080/api/tickets";

export const ticketService = {
  listar: async (estado = "") => {
    let url = API_URL;
    if (estado) url += `?estado=${estado}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los tickets");
    return response.json();
  },

  crear: async (titulo, descripcion, prioridad, usuarioId) => {
    const response = await fetch(`${API_URL}/usuario/${usuarioId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descripcion, prioridad, estado: "Abierto" }),
    });
    if (!response.ok) throw new Error("Error al crear el ticket");
    return response.json();
  },

  // AGREGADO PARA EL ABM COMPLETO: Modificación de contenido
  editar: async (id, ticketActualizado) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketActualizado),
    });
    if (!response.ok) throw new Error("Error al editar el ticket");
    return response.json();
  },

  cerrar: async (id) => {
    const response = await fetch(`${API_URL}/${id}/cerrar`, {
      method: "PUT"
    });
    if (!response.ok) throw new Error("Error al cerrar el ticket");
    return response.json();
  }
};
