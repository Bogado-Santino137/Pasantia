package com.tickets.repository;

import com.tickets.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método personalizado para verificar el correo electrónico en el Login
    Optional<Usuario> findByEmail(String email);
}
