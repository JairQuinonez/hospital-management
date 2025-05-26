import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundShapeComponent } from './background-shape.component';

describe('BackgroundShapeComponent', () => {
  let component: BackgroundShapeComponent;
  let fixture: ComponentFixture<BackgroundShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundShapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
