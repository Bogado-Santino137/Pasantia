package com.tickets.service;

import com.tickets.entity.Ticket;
import com.tickets.entity.Usuario;
import com.tickets.repository.TicketRepository;
import com.tickets.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UsuarioRepository usuarioRepository;

    public TicketService(TicketRepository ticketRepository, UsuarioRepository usuarioRepository) {
        this.ticketRepository = ticketRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Ticket> listarTodos() {
        return ticketRepository.findAll();
    }

    public List<Ticket> filtrarPorEstado(String estado) {
        return ticketRepository.findByEstado(estado);
    }

    public Ticket crearTicket(Ticket ticket, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        ticket.setUsuario(usuario);
        return ticketRepository.save(ticket);
    }

    public Ticket editarTicket(Long id, Ticket ticketDetalles) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
        
        ticket.setTitulo(ticketDetalles.getTitulo());
        ticket.setDescripcion(ticketDetalles.getDescripcion());
        ticket.setEstado(ticketDetalles.getEstado());
        ticket.setPrioridad(ticketDetalles.getPrioridad());
        
        return ticketRepository.save(ticket);
    }

    public Ticket cerrarTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado"));
        ticket.setEstado("Cerrado");
        return ticketRepository.save(ticket);
    }
}
