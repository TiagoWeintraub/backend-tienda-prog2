package ar.edu.um.programacion2.repository;

import ar.edu.um.programacion2.domain.Dispositivo;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class DispositivoRepositoryWithBagRelationshipsImpl implements DispositivoRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Dispositivo> fetchBagRelationships(Optional<Dispositivo> dispositivo) {
        return dispositivo.map(this::fetchAdicionales);
    }

    @Override
    public Page<Dispositivo> fetchBagRelationships(Page<Dispositivo> dispositivos) {
        return new PageImpl<>(
            fetchBagRelationships(dispositivos.getContent()),
            dispositivos.getPageable(),
            dispositivos.getTotalElements()
        );
    }

    @Override
    public List<Dispositivo> fetchBagRelationships(List<Dispositivo> dispositivos) {
        return Optional.of(dispositivos).map(this::fetchAdicionales).orElse(Collections.emptyList());
    }

    Dispositivo fetchAdicionales(Dispositivo result) {
        return entityManager
            .createQuery(
                "select dispositivo from Dispositivo dispositivo left join fetch dispositivo.adicionales where dispositivo is :dispositivo",
                Dispositivo.class
            )
            .setParameter("dispositivo", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Dispositivo> fetchAdicionales(List<Dispositivo> dispositivos) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, dispositivos.size()).forEach(index -> order.put(dispositivos.get(index).getId(), index));
        List<Dispositivo> result = entityManager
            .createQuery(
                "select distinct dispositivo from Dispositivo dispositivo left join fetch dispositivo.adicionales where dispositivo in :dispositivos",
                Dispositivo.class
            )
            .setParameter("dispositivos", dispositivos)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
