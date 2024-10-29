import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PersonalizacionComponent } from './list/personalizacion.component';
import { PersonalizacionDetailComponent } from './detail/personalizacion-detail.component';
import { PersonalizacionUpdateComponent } from './update/personalizacion-update.component';
import { PersonalizacionDeleteDialogComponent } from './delete/personalizacion-delete-dialog.component';
import { PersonalizacionRoutingModule } from './route/personalizacion-routing.module';

@NgModule({
  imports: [SharedModule, PersonalizacionRoutingModule],
  declarations: [
    PersonalizacionComponent,
    PersonalizacionDetailComponent,
    PersonalizacionUpdateComponent,
    PersonalizacionDeleteDialogComponent,
  ],
})
export class PersonalizacionModule {}
