package ar.edu.um.programacion2.service.mapper;

import ar.edu.um.programacion2.domain.Venta;
import ar.edu.um.programacion2.service.dto.VentaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Venta} and its DTO {@link VentaDTO}.
 */
@Mapper(componentModel = "spring")
public interface VentaMapper extends EntityMapper<VentaDTO, Venta> {}
