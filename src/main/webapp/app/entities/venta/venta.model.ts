import dayjs from 'dayjs/esm';

export interface IVenta {
  id: number;
  fechaVenta?: dayjs.Dayjs | null;
  precioFinal?: number | null;
}

export type NewVenta = Omit<IVenta, 'id'> & { id: null };
