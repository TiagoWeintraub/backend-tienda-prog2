import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AdicionalFormService } from './adicional-form.service';
import { AdicionalService } from '../service/adicional.service';
import { IAdicional } from '../adicional.model';

import { AdicionalUpdateComponent } from './adicional-update.component';

describe('Adicional Management Update Component', () => {
  let comp: AdicionalUpdateComponent;
  let fixture: ComponentFixture<AdicionalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let adicionalFormService: AdicionalFormService;
  let adicionalService: AdicionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AdicionalUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AdicionalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdicionalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    adicionalFormService = TestBed.inject(AdicionalFormService);
    adicionalService = TestBed.inject(AdicionalService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const adicional: IAdicional = { id: 456 };

      activatedRoute.data = of({ adicional });
      comp.ngOnInit();

      expect(comp.adicional).toEqual(adicional);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdicional>>();
      const adicional = { id: 123 };
      jest.spyOn(adicionalFormService, 'getAdicional').mockReturnValue(adicional);
      jest.spyOn(adicionalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adicional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adicional }));
      saveSubject.complete();

      // THEN
      expect(adicionalFormService.getAdicional).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(adicionalService.update).toHaveBeenCalledWith(expect.objectContaining(adicional));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdicional>>();
      const adicional = { id: 123 };
      jest.spyOn(adicionalFormService, 'getAdicional').mockReturnValue({ id: null });
      jest.spyOn(adicionalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adicional: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: adicional }));
      saveSubject.complete();

      // THEN
      expect(adicionalFormService.getAdicional).toHaveBeenCalled();
      expect(adicionalService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdicional>>();
      const adicional = { id: 123 };
      jest.spyOn(adicionalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ adicional });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(adicionalService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
