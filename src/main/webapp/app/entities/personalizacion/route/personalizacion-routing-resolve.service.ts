import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPersonalizacion } from '../personalizacion.model';
import { PersonalizacionService } from '../service/personalizacion.service';

@Injectable({ providedIn: 'root' })
export class PersonalizacionRoutingResolveService implements Resolve<IPersonalizacion | null> {
  constructor(protected service: PersonalizacionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonalizacion | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((personalizacion: HttpResponse<IPersonalizacion>) => {
          if (personalizacion.body) {
            return of(personalizacion.body);
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
