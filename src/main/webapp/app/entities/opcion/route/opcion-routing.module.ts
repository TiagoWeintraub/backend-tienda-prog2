import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OpcionComponent } from '../list/opcion.component';
import { OpcionDetailComponent } from '../detail/opcion-detail.component';
import { OpcionUpdateComponent } from '../update/opcion-update.component';
import { OpcionRoutingResolveService } from './opcion-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const opcionRoute: Routes = [
  {
    path: '',
    component: OpcionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OpcionDetailComponent,
    resolve: {
      opcion: OpcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OpcionUpdateComponent,
    resolve: {
      opcion: OpcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OpcionUpdateComponent,
    resolve: {
      opcion: OpcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(opcionRoute)],
  exports: [RouterModule],
})
export class OpcionRoutingModule {}
