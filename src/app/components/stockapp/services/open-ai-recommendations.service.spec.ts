import { TestBed } from '@angular/core/testing';

import { OpenAiRecommendationsService } from './open-ai-recommendations.service';

describe('OpenAiRecommendationsService', () => {
  let service: OpenAiRecommendationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAiRecommendationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
