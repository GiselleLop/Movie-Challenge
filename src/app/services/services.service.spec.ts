import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { MovieService } from './movie.service';
import { TestScheduler } from 'rxjs/testing';

describe('ServicesService', () => {
  let service: MovieService;
  let testScheduler: TestScheduler;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
