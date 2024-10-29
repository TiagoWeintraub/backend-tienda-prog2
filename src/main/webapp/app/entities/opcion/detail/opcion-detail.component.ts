import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOpcion } from '../opcion.model';

@Component({
  selector: 'jhi-opcion-detail',
  templateUrl: './opcion-detail.component.html',
})
export class OpcionDetailComponent implements OnInit {
  opcion: IOpcion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ opcion }) => {
      this.opcion = opcion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
