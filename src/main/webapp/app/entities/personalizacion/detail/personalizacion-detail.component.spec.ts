import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PersonalizacionDetailComponent } from './personalizacion-detail.component';

describe('Personalizacion Management Detail Component', () => {
  let comp: PersonalizacionDetailComponent;
  let fixture: ComponentFixture<PersonalizacionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalizacionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ personalizacion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PersonalizacionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PersonalizacionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load personalizacion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.personalizacion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
