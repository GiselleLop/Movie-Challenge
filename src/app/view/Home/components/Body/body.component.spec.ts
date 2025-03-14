import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyComponent } from './body.component';
import { MovieService } from 'src/app/services/movie.service';
import { SharedService } from 'src/app/services/shared.service';
import { FilterService } from 'src/app/services/filters.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { movie } from 'src/app/interfaces/movie';
import { of } from 'rxjs';

import { Router } from '@angular/router';

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

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let sharedService: SharedService;
  let filterService: FilterService;
  let movieService: MovieService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyComponent],
      providers: [MovieService, SharedService, FilterService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    filterService = TestBed.inject(FilterService);
    movieService = TestBed.inject(MovieService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a container for filters', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-filter')).toBeTruthy();
  });
  it('should have a container for movies', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.moviesContainer')).toBeTruthy();
  });

  it('should render a card for each movie in data', () => {
    component.dataPeerPage = testData;
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelectorAll('app-movie');
    expect(cardElement.length).toBe(testData.length);
  });
  it('should redirect to /detail-movie when a movie is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.redirectToDetailView();
    expect(navigateSpy).toHaveBeenCalled();
  });
  it('should store selected movie in localStorage and redirect to detail view', () => {
    const mockMovie = testData[0];
    spyOn(localStorage, 'setItem');
    spyOn(component, 'redirectToDetailView');
    component.viewDetailMovie(mockMovie);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'selectedMovie',
      JSON.stringify(mockMovie)
    );
    expect(component.redirectToDetailView).toHaveBeenCalled();
  });
  it('should update filtered data in ascending order', () => {
    const mockData = testData;
    component.dataAllPages = mockData;

    spyOn(sharedService, 'updateFilteredData').and.callThrough();
    component.getDataAsc();

    expect(sharedService.updateFilteredData).toHaveBeenCalledWith(
      mockData.reverse()
    );
  });

  it('should handle optionFilterSelected$ observable when gender is "All"', () => {
    component.dataPrincipal = testData;
    const mockGender = 'All';

    filterService.optionFilterSelectedSubject.next(mockGender);

    expect(component.dataAllPages).toEqual(component.dataPrincipal);
  });

  it('should handle optionFilterSelected$ observable when gender is a number', () => {
    component.dataPrincipal = testData;
    const mockGender = '28';
    spyOn(filterService, 'filterByGenre').and.returnValue([testData[0]]);
    filterService.optionFilterSelectedSubject.next(mockGender);

    expect(filterService.filterByGenre).toHaveBeenCalledWith(
      testData,
      mockGender
    );
  });

  it('should handle optionFilterSelected$ observable when gender is "ASC" or "DESC"', () => {
    component.dataPrincipal = testData;
    spyOn(component, 'getDataAsc');

    filterService.optionFilterSelectedSubject.next('ASC');
    filterService.optionFilterSelectedSubject.next('DESC');

    expect(component.getDataAsc).toHaveBeenCalledTimes(2);
  });
  
  it('should subscribe to movieService and set dataAllPages and dataPrincipal', () => {
    spyOn(movieService, 'getDataAllPages').and.returnValue(of(testData));

    component.ngOnInit();
    expect(movieService.getDataAllPages).toHaveBeenCalled();

  });

});
