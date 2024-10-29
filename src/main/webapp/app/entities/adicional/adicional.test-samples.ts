import { IAdicional, NewAdicional } from './adicional.model';

export const sampleWithRequiredData: IAdicional = {
  id: 26695,
  nombre: 'Nepalese Division Adaptive',
  descripcion: 'Frozen',
  precio: 62739,
};

export const sampleWithPartialData: IAdicional = {
  id: 33563,
  nombre: 'models Realigned',
  descripcion: 'toolset',
  precio: 90033,
  precioGratis: 7381,
};

export const sampleWithFullData: IAdicional = {
  id: 96693,
  nombre: 'exploit Directives',
  descripcion: 'moratorium Quality',
  precio: 7692,
  precioGratis: 86228,
};

export const sampleWithNewData: NewAdicional = {
  nombre: 'extensible San',
  descripcion: 'input',
  precio: 75989,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
