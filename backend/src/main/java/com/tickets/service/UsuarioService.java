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
}
