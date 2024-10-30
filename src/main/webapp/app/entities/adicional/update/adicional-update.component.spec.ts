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
import { IDispositivo } from 'app/entities/dispositivo/dispositivo.model';
import { DispositivoService } from 'app/entities/dispositivo/service/dispositivo.service';

import { AdicionalUpdateComponent } from './adicional-update.component';

describe('Adicional Management Update Component', () => {
  let comp: AdicionalUpdateComponent;
  let fixture: ComponentFixture<AdicionalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let adicionalFormService: AdicionalFormService;
  let adicionalService: AdicionalService;
  let dispositivoService: DispositivoService;

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
    dispositivoService = TestBed.inject(DispositivoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Dispositivo query and add missing value', () => {
      const adicional: IAdicional = { id: 456 };
      const dispositivo: IDispositivo = { id: 42317 };
      adicional.dispositivo = dispositivo;

      const dispositivoCollection: IDispositivo[] = [{ id: 1012 }];
      jest.spyOn(dispositivoService, 'query').mockReturnValue(of(new HttpResponse({ body: dispositivoCollection })));
      const additionalDispositivos = [dispositivo];
      const expectedCollection: IDispositivo[] = [...additionalDispositivos, ...dispositivoCollection];
      jest.spyOn(dispositivoService, 'addDispositivoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ adicional });
      comp.ngOnInit();

      expect(dispositivoService.query).toHaveBeenCalled();
      expect(dispositivoService.addDispositivoToCollectionIfMissing).toHaveBeenCalledWith(
        dispositivoCollection,
        ...additionalDispositivos.map(expect.objectContaining)
      );
      expect(comp.dispositivosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const adicional: IAdicional = { id: 456 };
      const dispositivo: IDispositivo = { id: 83018 };
      adicional.dispositivo = dispositivo;

      activatedRoute.data = of({ adicional });
      comp.ngOnInit();

      expect(comp.dispositivosSharedCollection).toContain(dispositivo);
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

  describe('Compare relationships', () => {
    describe('compareDispositivo', () => {
      it('Should forward to dispositivoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(dispositivoService, 'compareDispositivo');
        comp.compareDispositivo(entity, entity2);
        expect(dispositivoService.compareDispositivo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
