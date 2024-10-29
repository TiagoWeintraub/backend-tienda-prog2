import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AdicionalComponent } from './list/adicional.component';
import { AdicionalDetailComponent } from './detail/adicional-detail.component';
import { AdicionalUpdateComponent } from './update/adicional-update.component';
import { AdicionalDeleteDialogComponent } from './delete/adicional-delete-dialog.component';
import { AdicionalRoutingModule } from './route/adicional-routing.module';

@NgModule({
  imports: [SharedModule, AdicionalRoutingModule],
  declarations: [AdicionalComponent, AdicionalDetailComponent, AdicionalUpdateComponent, AdicionalDeleteDialogComponent],
})
export class AdicionalModule {}
