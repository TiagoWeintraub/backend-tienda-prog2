import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICaracteristica } from '../caracteristica.model';

@Component({
  selector: 'jhi-caracteristica-detail',
  templateUrl: './caracteristica-detail.component.html',
})
export class CaracteristicaDetailComponent implements OnInit {
  caracteristica: ICaracteristica | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caracteristica }) => {
      this.caracteristica = caracteristica;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
