import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdicional } from '../adicional.model';
import { AdicionalService } from '../service/adicional.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './adicional-delete-dialog.component.html',
})
export class AdicionalDeleteDialogComponent {
  adicional?: IAdicional;

  constructor(protected adicionalService: AdicionalService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.adicionalService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
