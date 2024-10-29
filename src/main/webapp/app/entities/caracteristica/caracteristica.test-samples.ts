import { ICaracteristica, NewCaracteristica } from './caracteristica.model';

export const sampleWithRequiredData: ICaracteristica = {
  id: 51419,
  nombre: 'Berkshire Manors',
  descripcion: 'Refined Card',
};

export const sampleWithPartialData: ICaracteristica = {
  id: 28986,
  nombre: 'digital Brand envisioneer',
  descripcion: 'optimal zero',
};

export const sampleWithFullData: ICaracteristica = {
  id: 61961,
  nombre: 'syndicate',
  descripcion: 'synthesize payment',
};

export const sampleWithNewData: NewCaracteristica = {
  nombre: 'Soft',
  descripcion: 'input payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
