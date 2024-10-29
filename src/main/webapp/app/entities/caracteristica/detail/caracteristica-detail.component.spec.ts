import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CaracteristicaDetailComponent } from './caracteristica-detail.component';

describe('Caracteristica Management Detail Component', () => {
  let comp: CaracteristicaDetailComponent;
  let fixture: ComponentFixture<CaracteristicaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteristicaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ caracteristica: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CaracteristicaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CaracteristicaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load caracteristica on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.caracteristica).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
