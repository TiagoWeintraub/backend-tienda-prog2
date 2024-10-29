import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OpcionComponent } from './list/opcion.component';
import { OpcionDetailComponent } from './detail/opcion-detail.component';
import { OpcionUpdateComponent } from './update/opcion-update.component';
import { OpcionDeleteDialogComponent } from './delete/opcion-delete-dialog.component';
import { OpcionRoutingModule } from './route/opcion-routing.module';

@NgModule({
  imports: [SharedModule, OpcionRoutingModule],
  declarations: [OpcionComponent, OpcionDetailComponent, OpcionUpdateComponent, OpcionDeleteDialogComponent],
})
export class OpcionModule {}
