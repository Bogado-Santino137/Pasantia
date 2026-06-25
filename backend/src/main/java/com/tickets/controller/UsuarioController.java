package com.tickets.controller;

import com.tickets.entity.Usuario;
import com.tickets.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
// @CrossOrigin(origins = "*") // ¡Crucial! Permite que React se conecte sin trabas de CORS
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        Optional<Usuario> usuario = usuarioService.iniciarSesion(loginRequest.getEmail(), loginRequest.getPassword());
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarPerfil(@PathVariable Long id, @RequestBody Usuario usuarioDatos) {
        try {
            Usuario usuarioActualizado = usuarioService.modificarPerfil(id, usuarioDatos);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
