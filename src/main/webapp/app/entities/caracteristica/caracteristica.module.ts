import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CaracteristicaComponent } from './list/caracteristica.component';
import { CaracteristicaDetailComponent } from './detail/caracteristica-detail.component';
import { CaracteristicaUpdateComponent } from './update/caracteristica-update.component';
import { CaracteristicaDeleteDialogComponent } from './delete/caracteristica-delete-dialog.component';
import { CaracteristicaRoutingModule } from './route/caracteristica-routing.module';

@NgModule({
  imports: [SharedModule, CaracteristicaRoutingModule],
  declarations: [
    CaracteristicaComponent,
    CaracteristicaDetailComponent,
    CaracteristicaUpdateComponent,
    CaracteristicaDeleteDialogComponent,
  ],
})
export class CaracteristicaModule {}
