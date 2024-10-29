import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdicional } from '../adicional.model';

@Component({
  selector: 'jhi-adicional-detail',
  templateUrl: './adicional-detail.component.html',
})
export class AdicionalDetailComponent implements OnInit {
  adicional: IAdicional | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adicional }) => {
      this.adicional = adicional;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
