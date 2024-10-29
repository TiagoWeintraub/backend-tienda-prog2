import { IDispositivo, NewDispositivo } from './dispositivo.model';

export const sampleWithRequiredData: IDispositivo = {
  id: 71774,
  codigo: 'Licensed',
  nombre: 'hard Fresh Baby',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 9794,
  moneda: 'green',
};

export const sampleWithPartialData: IDispositivo = {
  id: 48349,
  codigo: 'Liaison Account',
  nombre: 'Communications haptic',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 3416,
  moneda: '1080p',
};

export const sampleWithFullData: IDispositivo = {
  id: 37257,
  codigo: 'Program Mouse',
  nombre: 'Architect',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 26584,
  moneda: 'Kroon Account',
};

export const sampleWithNewData: NewDispositivo = {
  codigo: 'facilitate info-mediaries Accountability',
  nombre: 'optical firewall',
  descripcion: '../fake-data/blob/hipster.txt',
  precioBase: 99005,
  moneda: 'Florida York synergy',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
