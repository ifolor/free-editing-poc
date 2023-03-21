import { TestBed } from '@angular/core/testing';
import { PlaceholderTransformationService } from './placeholder-transformation.service';

describe('HtmlTransformationService', () => {
  let service: PlaceholderTransformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceholderTransformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
