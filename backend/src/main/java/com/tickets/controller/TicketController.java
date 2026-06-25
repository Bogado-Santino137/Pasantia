package com.tickets.controller;

import com.tickets.entity.Ticket;
import com.tickets.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> obtenerTickets(@RequestParam(required = false) String estado) {
        if (estado != null && !estado.isEmpty()) {
            return ticketService.filtrarPorEstado(estado);
        }
        return ticketService.listarTodos();
    }

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> crear(@RequestBody Ticket ticket, @PathVariable Long usuarioId) {
        try {
            Ticket nuevoTicket = ticketService.crearTicket(ticket, usuarioId);
            return ResponseEntity.ok(nuevoTicket);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Ticket ticketDetalles) {
        try {
            Ticket actualizado = ticketService.editarTicket(id, ticketDetalles);
            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/cerrar")
    public ResponseEntity<?> cerrar(@PathVariable Long id) {
        try {
            Ticket cerrado = ticketService.cerrarTicket(id);
            return ResponseEntity.ok(cerrado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
