import { IPersonalizacion, NewPersonalizacion } from './personalizacion.model';

export const sampleWithRequiredData: IPersonalizacion = {
  id: 29851,
  nombre: 'withdrawal indexing Illinois',
  descripcion: 'Wooden',
};

export const sampleWithPartialData: IPersonalizacion = {
  id: 75500,
  nombre: 'Mouse',
  descripcion: 'conglomeration Chief',
};

export const sampleWithFullData: IPersonalizacion = {
  id: 47854,
  nombre: 'encoding indexing Manager',
  descripcion: 'calculate withdrawal system',
};

export const sampleWithNewData: NewPersonalizacion = {
  nombre: 'Utah Gorgeous back',
  descripcion: 'Rwanda',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
