export interface IDispositivo {
  id: number;
  codigo?: string | null;
  nombre?: string | null;
  descripcion?: string | null;
  precioBase?: number | null;
  moneda?: string | null;
}

export type NewDispositivo = Omit<IDispositivo, 'id'> & { id: null };
