import dayjs from 'dayjs/esm';
import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';

export interface IVenta {
  id: number;
  fechaVenta?: dayjs.Dayjs | null;
  precioFinal?: number | null;
  dispositivo?: Pick<IDispositivo, 'id'> | null;
}

export type NewVenta = Omit<IVenta, 'id'> & { id: null };
