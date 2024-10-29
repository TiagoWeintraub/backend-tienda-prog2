import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OpcionDetailComponent } from './opcion-detail.component';

describe('Opcion Management Detail Component', () => {
  let comp: OpcionDetailComponent;
  let fixture: ComponentFixture<OpcionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpcionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ opcion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OpcionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OpcionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load opcion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.opcion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
