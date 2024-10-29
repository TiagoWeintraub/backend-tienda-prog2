package ar.edu.um.programacion2.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Venta.
 */
@Entity
@Table(name = "venta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Venta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "fecha_venta", nullable = false)
    private Instant fechaVenta;

    @NotNull
    @Column(name = "precio_final", precision = 21, scale = 2, nullable = false)
    private BigDecimal precioFinal;

    @OneToMany(mappedBy = "venta")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "caracteristicas", "personalizaciones", "adicionales", "venta" }, allowSetters = true)
    private Set<Dispositivo> dispositivos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Venta id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFechaVenta() {
        return this.fechaVenta;
    }

    public Venta fechaVenta(Instant fechaVenta) {
        this.setFechaVenta(fechaVenta);
        return this;
    }

    public void setFechaVenta(Instant fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public BigDecimal getPrecioFinal() {
        return this.precioFinal;
    }

    public Venta precioFinal(BigDecimal precioFinal) {
        this.setPrecioFinal(precioFinal);
        return this;
    }

    public void setPrecioFinal(BigDecimal precioFinal) {
        this.precioFinal = precioFinal;
    }

    public Set<Dispositivo> getDispositivos() {
        return this.dispositivos;
    }

    public void setDispositivos(Set<Dispositivo> dispositivos) {
        if (this.dispositivos != null) {
            this.dispositivos.forEach(i -> i.setVenta(null));
        }
        if (dispositivos != null) {
            dispositivos.forEach(i -> i.setVenta(this));
        }
        this.dispositivos = dispositivos;
    }

    public Venta dispositivos(Set<Dispositivo> dispositivos) {
        this.setDispositivos(dispositivos);
        return this;
    }

    public Venta addDispositivo(Dispositivo dispositivo) {
        this.dispositivos.add(dispositivo);
        dispositivo.setVenta(this);
        return this;
    }

    public Venta removeDispositivo(Dispositivo dispositivo) {
        this.dispositivos.remove(dispositivo);
        dispositivo.setVenta(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Venta)) {
            return false;
        }
        return id != null && id.equals(((Venta) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Venta{" +
            "id=" + getId() +
            ", fechaVenta='" + getFechaVenta() + "'" +
            ", precioFinal=" + getPrecioFinal() +
            "}";
    }
}
