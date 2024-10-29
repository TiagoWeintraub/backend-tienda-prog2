import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AdicionalFormService, AdicionalFormGroup } from './adicional-form.service';
import { IAdicional } from '../adicional.model';
import { AdicionalService } from '../service/adicional.service';

@Component({
  selector: 'jhi-adicional-update',
  templateUrl: './adicional-update.component.html',
})
export class AdicionalUpdateComponent implements OnInit {
  isSaving = false;
  adicional: IAdicional | null = null;

  editForm: AdicionalFormGroup = this.adicionalFormService.createAdicionalFormGroup();

  constructor(
    protected adicionalService: AdicionalService,
    protected adicionalFormService: AdicionalFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adicional }) => {
      this.adicional = adicional;
      if (adicional) {
        this.updateForm(adicional);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adicional = this.adicionalFormService.getAdicional(this.editForm);
    if (adicional.id !== null) {
      this.subscribeToSaveResponse(this.adicionalService.update(adicional));
    } else {
      this.subscribeToSaveResponse(this.adicionalService.create(adicional));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdicional>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(adicional: IAdicional): void {
    this.adicional = adicional;
    this.adicionalFormService.resetForm(this.editForm, adicional);
  }
}
