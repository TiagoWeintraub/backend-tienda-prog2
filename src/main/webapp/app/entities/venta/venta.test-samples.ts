import dayjs from 'dayjs/esm';

import { IVenta, NewVenta } from './venta.model';

export const sampleWithRequiredData: IVenta = {
  id: 20448,
  fechaVenta: dayjs('2024-10-29T17:39'),
  precioFinal: 79952,
};

export const sampleWithPartialData: IVenta = {
  id: 32725,
  fechaVenta: dayjs('2024-10-29T17:38'),
  precioFinal: 4145,
};

export const sampleWithFullData: IVenta = {
  id: 56225,
  fechaVenta: dayjs('2024-10-29T03:08'),
  precioFinal: 57127,
};

export const sampleWithNewData: NewVenta = {
  fechaVenta: dayjs('2024-10-29T10:22'),
  precioFinal: 17570,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
