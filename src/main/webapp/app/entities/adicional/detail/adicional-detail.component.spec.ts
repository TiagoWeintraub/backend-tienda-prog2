import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdicionalDetailComponent } from './adicional-detail.component';

describe('Adicional Management Detail Component', () => {
  let comp: AdicionalDetailComponent;
  let fixture: ComponentFixture<AdicionalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionalDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ adicional: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AdicionalDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AdicionalDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load adicional on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.adicional).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
