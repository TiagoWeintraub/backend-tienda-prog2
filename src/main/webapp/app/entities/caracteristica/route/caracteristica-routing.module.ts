import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CaracteristicaComponent } from '../list/caracteristica.component';
import { CaracteristicaDetailComponent } from '../detail/caracteristica-detail.component';
import { CaracteristicaUpdateComponent } from '../update/caracteristica-update.component';
import { CaracteristicaRoutingResolveService } from './caracteristica-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const caracteristicaRoute: Routes = [
  {
    path: '',
    component: CaracteristicaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CaracteristicaDetailComponent,
    resolve: {
      caracteristica: CaracteristicaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CaracteristicaUpdateComponent,
    resolve: {
      caracteristica: CaracteristicaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CaracteristicaUpdateComponent,
    resolve: {
      caracteristica: CaracteristicaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(caracteristicaRoute)],
  exports: [RouterModule],
})
export class CaracteristicaRoutingModule {}
