import { TestBed } from '@angular/core/testing';

import { AppointsmentsService } from './appointsments.service';

describe('AppointsmentsService', () => {
  let service: AppointsmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointsmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
