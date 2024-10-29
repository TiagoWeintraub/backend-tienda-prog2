import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICaracteristica } from '../caracteristica.model';
import { CaracteristicaService } from '../service/caracteristica.service';

@Injectable({ providedIn: 'root' })
export class CaracteristicaRoutingResolveService implements Resolve<ICaracteristica | null> {
  constructor(protected service: CaracteristicaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICaracteristica | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((caracteristica: HttpResponse<ICaracteristica>) => {
          if (caracteristica.body) {
            return of(caracteristica.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
