import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'caracteristica',
        data: { pageTitle: 'tiendaApp.caracteristica.home.title' },
        loadChildren: () => import('./caracteristica/caracteristica.module').then(m => m.CaracteristicaModule),
      },
      {
        path: 'adicional',
        data: { pageTitle: 'tiendaApp.adicional.home.title' },
        loadChildren: () => import('./adicional/adicional.module').then(m => m.AdicionalModule),
      },
      {
        path: 'dispositivo',
        data: { pageTitle: 'tiendaApp.dispositivo.home.title' },
        loadChildren: () => import('./dispositivo/dispositivo.module').then(m => m.DispositivoModule),
      },
      {
        path: 'personalizacion',
        data: { pageTitle: 'tiendaApp.personalizacion.home.title' },
        loadChildren: () => import('./personalizacion/personalizacion.module').then(m => m.PersonalizacionModule),
      },
      {
        path: 'opcion',
        data: { pageTitle: 'tiendaApp.opcion.home.title' },
        loadChildren: () => import('./opcion/opcion.module').then(m => m.OpcionModule),
      },
      {
        path: 'venta',
        data: { pageTitle: 'tiendaApp.venta.home.title' },
        loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
