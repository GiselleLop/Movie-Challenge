import { TestBed } from '@angular/core/testing';
import { movie } from '../interfaces/movie';
import { FilterService } from './filters.service';

describe('FiltersService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should filter data by genre and return unique data', () => {
    const testData: movie[] = [
      {
        adult: false,
        backdrop_path: '/string',
        genre_ids: [28],
        id: 20,
        original_language: 'ESP',
        original_title: 'TITLE 1',
        overview: 'OVERVIEW',
        popularity: 5,
        poster_path: '/string',
        release_date: '2 - 12 -2020',
        title: 'TITLE 1',
        video: false,
        vote_average: 5,
        vote_count: 5,
      },
      {
        adult: false,
        backdrop_path: '/string',
        genre_ids: [35],
        id: 20,
        original_language: 'ENG',
        original_title: 'TITLE 2',
        overview: 'OVERVIEW',
        popularity: 5,
        poster_path: '/string',
        release_date: '2 - 12 -2020',
        title: 'TITLE 2',
        video: false,
        vote_average: 5,
        vote_count: 5,
      },
    ];
    

    let filteredData = service.filterByGenre(testData, 28);
    expect(filteredData.length).toBe(1); 

    
    filteredData = service.filterByGenre(testData, 35);
    expect(filteredData.length).toBe(1); 

   
    filteredData = service.filterByGenre(testData, 5);
    expect(filteredData.length).toBe(0); 

  
    const uniqueIds = filteredData.map(movie => movie.id);
    expect(uniqueIds.length).toBe(new Set(uniqueIds).size); 
  });

});
