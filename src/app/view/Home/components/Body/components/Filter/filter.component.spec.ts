import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterComponent } from './filter.component';
import { MovieService } from 'src/app/services/movie.service';
import { of } from 'rxjs';
describe('FilterComponent', () => {
  let component: FilterComponent;
  let movieService: MovieService;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MovieService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should subscribe to movieService.getGenres() and initialize genres and genresMap', () => {
    const mockGenres = {
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' }
      ]
    };
    spyOn(movieService, 'getGenres').and.returnValue(of(mockGenres));
    component.ngOnInit();
    expect(movieService.getGenres).toHaveBeenCalled();
    expect(component.genres).toEqual(mockGenres);
    expect(component.genresMap).toEqual({
      1: 'Action',
      2: 'Comedy'
    });
  });

});
