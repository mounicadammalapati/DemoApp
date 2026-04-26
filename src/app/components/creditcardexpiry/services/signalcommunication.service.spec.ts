import { TestBed } from '@angular/core/testing';

import { SignalcommunicationService } from './signalcommunication.service';

describe('SignalcommunicationService', () => {
  let service: SignalcommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalcommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
