import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDoctorComponent } from './medical-history-doctor.component';

describe('MedicalHistoryDoctorComponent', () => {
  let component: MedicalHistoryDoctorComponent;
  let fixture: ComponentFixture<MedicalHistoryDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
