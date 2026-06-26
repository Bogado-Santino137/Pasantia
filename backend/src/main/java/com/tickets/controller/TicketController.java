package com.tickets.controller;

import com.tickets.entity.Ticket;
import com.tickets.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
//@CrossOrigin(origins = "*") // Clave para conectarse con React
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // GET http://localhost:8080/api/tickets
    @GetMapping
    public List<Ticket> obtenerTickets(@RequestParam(required = false) String estado) {
        if (estado != null && !estado.isEmpty()) {
            return ticketService.filtrarPorEstado(estado);
        }
        return ticketService.listarTodos();
    }

    // POST http://localhost:8080/api/tickets/usuario/{usuarioId}
    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> crear(@RequestBody Ticket ticket, @PathVariable Long usuarioId) {
        try {
            Ticket nuevoTicket = ticketService.crearTicket(ticket, usuarioId);
            return ResponseEntity.ok(nuevoTicket);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT http://localhost:8080/api/tickets/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Ticket ticketDetalles) {
        try {
            Ticket actualizado = ticketService.editarTicket(id, ticketDetalles);
            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PUT http://localhost:8080/api/tickets/{id}/cerrar
    @PutMapping("/{id}/cerrar")
    public ResponseEntity<?> cerrar(@PathVariable Long id) {
        try {
            Ticket cerrado = ticketService.cerrarTicket(id);
            return ResponseEntity.ok(cerrado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // NUEVO ENDPOINT DINÁMICO: DELETE http://localhost:8080/api/tickets/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            ticketService.eliminarTicket(id);
            return ResponseEntity.ok("Ticket eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
