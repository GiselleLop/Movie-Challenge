import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FooterComponent } from './footer.component';
import { MovieService } from 'src/app/services/movie.service';
import { of } from 'rxjs';
import { movie } from 'src/app/interfaces/movie';
import { SharedService } from 'src/app/services/shared.service';

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

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let movieService: MovieService;
  let sharedService: SharedService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [HttpClientTestingModule],
      providers: [MovieService, SharedService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a container for paginator', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.footer-page')).toBeTruthy();
  });
  it('should render an button for each page', () => {
    const pageTest: number[] = [1, 2, 3, 4, 5];
    component.pages = pageTest;
    fixture.detectChanges();
    const pageElements = fixture.nativeElement.querySelectorAll(
      '.footer-page .pagination app-buttons'
    );
    expect(pageElements.length).toBe(pageTest.length);
  });
  it('should subscribe to movieService.getDataAllPages() and update totalItems and pagination', () => {
    spyOn(movieService, 'getDataAllPages').and.returnValue(of(testData));

    fixture.detectChanges();
    expect(component.totalItems).toBe(0);

    component.ngOnInit();
    expect(movieService.getDataAllPages).toHaveBeenCalled();
    expect(component.totalItems).toEqual(testData.flat().length);
  });
  it('should change page correctly', () => {
    component.changePage(1);

    expect(component.pageSelected).toBe(1);
  });
});
