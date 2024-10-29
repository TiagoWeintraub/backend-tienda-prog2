import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAdicional } from '../adicional.model';
import { AdicionalService } from '../service/adicional.service';

@Injectable({ providedIn: 'root' })
export class AdicionalRoutingResolveService implements Resolve<IAdicional | null> {
  constructor(protected service: AdicionalService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdicional | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((adicional: HttpResponse<IAdicional>) => {
          if (adicional.body) {
            return of(adicional.body);
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
