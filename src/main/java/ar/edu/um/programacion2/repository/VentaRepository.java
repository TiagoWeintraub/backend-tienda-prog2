package ar.edu.um.programacion2.repository;

import ar.edu.um.programacion2.domain.Venta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Venta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {}
