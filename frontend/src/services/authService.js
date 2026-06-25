const API_URL = "http://localhost:8080/api/usuarios";

export const authService = {
  registro: async (nombre, apellido, email, password) => {
    const response = await fetch(`${API_URL}/registro`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, apellido, email, password }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en el registro");
    }
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Credenciales inválidas");
    }
    return response.json();
  },

  // ADICIÓN REQUERIDA: Esto elimina el cartel rojo de la pantalla
  actualizarPerfil: async (id, nombre, apellido, email, password) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, apellido, email, password }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al actualizar el perfil");
    }
    return response.json();
  }
};
