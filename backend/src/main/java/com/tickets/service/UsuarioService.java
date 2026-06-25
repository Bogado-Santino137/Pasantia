package com.tickets.service;

import com.tickets.entity.Usuario;
import com.tickets.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario registrarUsuario(Usuario usuario) {
        // Validación simple: verificar si el email ya existe
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya se encuentra registrado");
        }
        // Guardamos el usuario de forma directa en Postgres
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> iniciarSesion(String email, String password) {
        return usuarioRepository.findByEmail(email)
        .filter(u -> u.getPassword().equals(password)); // Validación de texto plano por ahora
    }
        public Usuario modificarPerfil(Long id, Usuario datosActualizados) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuario.setNombre(datosActualizados.getNombre());
        usuario.setApellido(datosActualizados.getApellido());
        usuario.setEmail(datosActualizados.getEmail());
        
        // Si el usuario envía una nueva contraseña, la actualizamos
        if (datosActualizados.getPassword() != null && !datosActualizados.getPassword().isEmpty()) {
            usuario.setPassword(datosActualizados.getPassword());
        }
        return usuarioRepository.save(usuario);
    }
}

