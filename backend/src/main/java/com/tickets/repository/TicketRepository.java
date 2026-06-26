package com.tickets.repository;

import com.tickets.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // Debe coincidir de forma exacta con el método que busca el Service
    List<Ticket> findByEstado(String estado);
}
