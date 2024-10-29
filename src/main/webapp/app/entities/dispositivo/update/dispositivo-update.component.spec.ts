import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DispositivoFormService } from './dispositivo-form.service';
import { DispositivoService } from '../service/dispositivo.service';
import { IDispositivo } from '../dispositivo.model';
import { IAdicional } from 'app/entities/adicional/adicional.model';
import { AdicionalService } from 'app/entities/adicional/service/adicional.service';
import { IVenta } from 'app/entities/venta/venta.model';
import { VentaService } from 'app/entities/venta/service/venta.service';

import { DispositivoUpdateComponent } from './dispositivo-update.component';

describe('Dispositivo Management Update Component', () => {
  let comp: DispositivoUpdateComponent;
  let fixture: ComponentFixture<DispositivoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dispositivoFormService: DispositivoFormService;
  let dispositivoService: DispositivoService;
  let adicionalService: AdicionalService;
  let ventaService: VentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DispositivoUpdateComponent],
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
      .overrideTemplate(DispositivoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DispositivoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dispositivoFormService = TestBed.inject(DispositivoFormService);
    dispositivoService = TestBed.inject(DispositivoService);
    adicionalService = TestBed.inject(AdicionalService);
    ventaService = TestBed.inject(VentaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Adicional query and add missing value', () => {
      const dispositivo: IDispositivo = { id: 456 };
      const adicionales: IAdicional[] = [{ id: 4526 }];
      dispositivo.adicionales = adicionales;

      const adicionalCollection: IAdicional[] = [{ id: 97297 }];
      jest.spyOn(adicionalService, 'query').mockReturnValue(of(new HttpResponse({ body: adicionalCollection })));
      const additionalAdicionals = [...adicionales];
      const expectedCollection: IAdicional[] = [...additionalAdicionals, ...adicionalCollection];
      jest.spyOn(adicionalService, 'addAdicionalToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      expect(adicionalService.query).toHaveBeenCalled();
      expect(adicionalService.addAdicionalToCollectionIfMissing).toHaveBeenCalledWith(
        adicionalCollection,
        ...additionalAdicionals.map(expect.objectContaining)
      );
      expect(comp.adicionalsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Venta query and add missing value', () => {
      const dispositivo: IDispositivo = { id: 456 };
      const venta: IVenta = { id: 93307 };
      dispositivo.venta = venta;

      const ventaCollection: IVenta[] = [{ id: 88005 }];
      jest.spyOn(ventaService, 'query').mockReturnValue(of(new HttpResponse({ body: ventaCollection })));
      const additionalVentas = [venta];
      const expectedCollection: IVenta[] = [...additionalVentas, ...ventaCollection];
      jest.spyOn(ventaService, 'addVentaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      expect(ventaService.query).toHaveBeenCalled();
      expect(ventaService.addVentaToCollectionIfMissing).toHaveBeenCalledWith(
        ventaCollection,
        ...additionalVentas.map(expect.objectContaining)
      );
      expect(comp.ventasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dispositivo: IDispositivo = { id: 456 };
      const adicionales: IAdicional = { id: 25929 };
      dispositivo.adicionales = [adicionales];
      const venta: IVenta = { id: 40477 };
      dispositivo.venta = venta;

      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      expect(comp.adicionalsSharedCollection).toContain(adicionales);
      expect(comp.ventasSharedCollection).toContain(venta);
      expect(comp.dispositivo).toEqual(dispositivo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDispositivo>>();
      const dispositivo = { id: 123 };
      jest.spyOn(dispositivoFormService, 'getDispositivo').mockReturnValue(dispositivo);
      jest.spyOn(dispositivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dispositivo }));
      saveSubject.complete();

      // THEN
      expect(dispositivoFormService.getDispositivo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dispositivoService.update).toHaveBeenCalledWith(expect.objectContaining(dispositivo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDispositivo>>();
      const dispositivo = { id: 123 };
      jest.spyOn(dispositivoFormService, 'getDispositivo').mockReturnValue({ id: null });
      jest.spyOn(dispositivoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dispositivo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dispositivo }));
      saveSubject.complete();

      // THEN
      expect(dispositivoFormService.getDispositivo).toHaveBeenCalled();
      expect(dispositivoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDispositivo>>();
      const dispositivo = { id: 123 };
      jest.spyOn(dispositivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dispositivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dispositivoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAdicional', () => {
      it('Should forward to adicionalService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(adicionalService, 'compareAdicional');
        comp.compareAdicional(entity, entity2);
        expect(adicionalService.compareAdicional).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareVenta', () => {
      it('Should forward to ventaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ventaService, 'compareVenta');
        comp.compareVenta(entity, entity2);
        expect(ventaService.compareVenta).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
