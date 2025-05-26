import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAvatarUploadComponent } from './patient-avatar-upload.component';

describe('PatientAvatarUploadComponent', () => {
  let component: PatientAvatarUploadComponent;
  let fixture: ComponentFixture<PatientAvatarUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAvatarUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAvatarUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
