const API_URL = "http://localhost:8080/api/usuarios";

export const authService = {
  registro: async (nombre, apellido, email, password) => {
    // CORREGIDO: Cambiamos /generate por /registro para que coincida con tu Java Controller
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
  }
};
