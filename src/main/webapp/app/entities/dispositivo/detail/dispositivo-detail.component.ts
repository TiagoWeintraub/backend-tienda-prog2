import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDispositivo } from '../dispositivo.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-dispositivo-detail',
  templateUrl: './dispositivo-detail.component.html',
})
export class DispositivoDetailComponent implements OnInit {
  dispositivo: IDispositivo | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dispositivo }) => {
      this.dispositivo = dispositivo;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
