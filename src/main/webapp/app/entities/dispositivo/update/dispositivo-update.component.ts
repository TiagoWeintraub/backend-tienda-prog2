import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DispositivoFormService, DispositivoFormGroup } from './dispositivo-form.service';
import { IDispositivo } from '../dispositivo.model';
import { DispositivoService } from '../service/dispositivo.service';

@Component({
  selector: 'jhi-dispositivo-update',
  templateUrl: './dispositivo-update.component.html',
})
export class DispositivoUpdateComponent implements OnInit {
  isSaving = false;
  dispositivo: IDispositivo | null = null;

  editForm: DispositivoFormGroup = this.dispositivoFormService.createDispositivoFormGroup();

  constructor(
    protected dispositivoService: DispositivoService,
    protected dispositivoFormService: DispositivoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dispositivo }) => {
      this.dispositivo = dispositivo;
      if (dispositivo) {
        this.updateForm(dispositivo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dispositivo = this.dispositivoFormService.getDispositivo(this.editForm);
    if (dispositivo.id !== null) {
      this.subscribeToSaveResponse(this.dispositivoService.update(dispositivo));
    } else {
      this.subscribeToSaveResponse(this.dispositivoService.create(dispositivo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDispositivo>>): void {
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

  protected updateForm(dispositivo: IDispositivo): void {
    this.dispositivo = dispositivo;
    this.dispositivoFormService.resetForm(this.editForm, dispositivo);
  }
}
