import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonalizacion } from '../personalizacion.model';

@Component({
  selector: 'jhi-personalizacion-detail',
  templateUrl: './personalizacion-detail.component.html',
})
export class PersonalizacionDetailComponent implements OnInit {
  personalizacion: IPersonalizacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personalizacion }) => {
      this.personalizacion = personalizacion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
