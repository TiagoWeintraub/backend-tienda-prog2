import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PersonalizacionComponent } from '../list/personalizacion.component';
import { PersonalizacionDetailComponent } from '../detail/personalizacion-detail.component';
import { PersonalizacionUpdateComponent } from '../update/personalizacion-update.component';
import { PersonalizacionRoutingResolveService } from './personalizacion-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const personalizacionRoute: Routes = [
  {
    path: '',
    component: PersonalizacionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonalizacionDetailComponent,
    resolve: {
      personalizacion: PersonalizacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonalizacionUpdateComponent,
    resolve: {
      personalizacion: PersonalizacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonalizacionUpdateComponent,
    resolve: {
      personalizacion: PersonalizacionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(personalizacionRoute)],
  exports: [RouterModule],
})
export class PersonalizacionRoutingModule {}
