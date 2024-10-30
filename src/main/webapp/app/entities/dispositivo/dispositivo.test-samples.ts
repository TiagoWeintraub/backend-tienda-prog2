import { IDispositivo, NewDispositivo } from './dispositivo.model';

export const sampleWithRequiredData: IDispositivo = {
  id: 71774,
  codigo: 'Licensed',
  nombre: 'hard Fresh Baby',
  descripcion: 'teal',
  precioBase: 11867,
  moneda: 'Cambridgeshire Soap',
};

export const sampleWithPartialData: IDispositivo = {
  id: 91774,
  codigo: 'Communications haptic',
  nombre: 'Self-enabling',
  descripcion: 'harness Mouse',
  precioBase: 18092,
  moneda: 'Ranch Credit plum',
};

export const sampleWithFullData: IDispositivo = {
  id: 58200,
  codigo: 'facilitate info-mediaries Accountability',
  nombre: 'optical firewall',
  descripcion: 'Naira Toys FTP',
  precioBase: 66502,
  moneda: 'Director Health',
};

export const sampleWithNewData: NewDispositivo = {
  codigo: 'Director reserved',
  nombre: 'array',
  descripcion: 'Borders solution',
  precioBase: 72340,
  moneda: 'North Yen',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
