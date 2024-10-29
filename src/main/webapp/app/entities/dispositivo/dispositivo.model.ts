import { IAdicional } from 'app/entities/adicional/adicional.model';
import { IVenta } from 'app/entities/venta/venta.model';

export interface IDispositivo {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  descripcion?: string | null;
  precioBase?: number | null;
  moneda?: string | null;
  adicionales?: Pick<IAdicional, 'id'>[] | null;
  venta?: Pick<IVenta, 'id'> | null;
}

export type NewDispositivo = Omit<IDispositivo, 'id'> & { id: null };
