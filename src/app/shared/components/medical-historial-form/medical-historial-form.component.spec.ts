import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistorialFormComponent } from './medical-historial-form.component';

describe('MedicalHistorialFormComponent', () => {
  let component: MedicalHistorialFormComponent;
  let fixture: ComponentFixture<MedicalHistorialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistorialFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistorialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
