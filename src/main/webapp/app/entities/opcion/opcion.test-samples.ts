import { IOpcion, NewOpcion } from './opcion.model';

export const sampleWithRequiredData: IOpcion = {
  id: 55049,
  codigo: 'Mission',
  nombre: 'implementation scalable Optimization',
  descripcion: 'input',
  precioAdicional: 87210,
};

export const sampleWithPartialData: IOpcion = {
  id: 83515,
  codigo: 'payment Avon one-to-one',
  nombre: 'Table',
  descripcion: 'Sports Money white',
  precioAdicional: 76793,
};

export const sampleWithFullData: IOpcion = {
  id: 19038,
  codigo: 'Incredible West Coordinator',
  nombre: 'Borders',
  descripcion: 'up Facilitator generate',
  precioAdicional: 35026,
};

export const sampleWithNewData: NewOpcion = {
  codigo: 'El Car',
  nombre: 'lavender quantify Shoes',
  descripcion: 'B2C',
  precioAdicional: 58441,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
