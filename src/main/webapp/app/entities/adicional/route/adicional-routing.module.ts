import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AdicionalComponent } from '../list/adicional.component';
import { AdicionalDetailComponent } from '../detail/adicional-detail.component';
import { AdicionalUpdateComponent } from '../update/adicional-update.component';
import { AdicionalRoutingResolveService } from './adicional-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const adicionalRoute: Routes = [
  {
    path: '',
    component: AdicionalComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdicionalDetailComponent,
    resolve: {
      adicional: AdicionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdicionalUpdateComponent,
    resolve: {
      adicional: AdicionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdicionalUpdateComponent,
    resolve: {
      adicional: AdicionalRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adicionalRoute)],
  exports: [RouterModule],
})
export class AdicionalRoutingModule {}
