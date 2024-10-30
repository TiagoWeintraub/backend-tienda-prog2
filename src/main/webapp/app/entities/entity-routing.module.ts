import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'venta',
        data: { pageTitle: 'tiendaApiApp.venta.home.title' },
        loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule),
      },
      {
        path: 'dispositivo',
        data: { pageTitle: 'tiendaApiApp.dispositivo.home.title' },
        loadChildren: () => import('./dispositivo/dispositivo.module').then(m => m.DispositivoModule),
      },
      {
        path: 'caracteristica',
        data: { pageTitle: 'tiendaApiApp.caracteristica.home.title' },
        loadChildren: () => import('./caracteristica/caracteristica.module').then(m => m.CaracteristicaModule),
      },
      {
        path: 'personalizacion',
        data: { pageTitle: 'tiendaApiApp.personalizacion.home.title' },
        loadChildren: () => import('./personalizacion/personalizacion.module').then(m => m.PersonalizacionModule),
      },
      {
        path: 'opcion',
        data: { pageTitle: 'tiendaApiApp.opcion.home.title' },
        loadChildren: () => import('./opcion/opcion.module').then(m => m.OpcionModule),
      },
      {
        path: 'adicional',
        data: { pageTitle: 'tiendaApiApp.adicional.home.title' },
        loadChildren: () => import('./adicional/adicional.module').then(m => m.AdicionalModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
