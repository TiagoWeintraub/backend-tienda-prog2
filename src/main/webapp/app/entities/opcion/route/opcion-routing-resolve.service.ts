import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOpcion } from '../opcion.model';
import { OpcionService } from '../service/opcion.service';

@Injectable({ providedIn: 'root' })
export class OpcionRoutingResolveService implements Resolve<IOpcion | null> {
  constructor(protected service: OpcionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOpcion | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((opcion: HttpResponse<IOpcion>) => {
          if (opcion.body) {
            return of(opcion.body);
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
