package ar.edu.um.programacion2.service.mapper;

import ar.edu.um.programacion2.domain.Adicional;
import ar.edu.um.programacion2.service.dto.AdicionalDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Adicional} and its DTO {@link AdicionalDTO}.
 */
@Mapper(componentModel = "spring")
public interface AdicionalMapper extends EntityMapper<AdicionalDTO, Adicional> {}
