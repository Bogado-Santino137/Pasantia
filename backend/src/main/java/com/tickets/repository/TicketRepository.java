package com.tickets.repository;

import com.tickets.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // Método personalizado para cumplir con el requisito de filtrar tickets por estado
    List<Ticket> findByEstado(String estado);
}
