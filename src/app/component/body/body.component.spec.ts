import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyComponent } from './body.component';
import { MovieService } from 'src/app/services/services.service';
import { SharedService } from 'src/app/services/shared.service';
import { FilterService } from 'src/app/services/filters.service';
import { PaginationService } from 'src/app/services/paginator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyComponent ],
      providers: [MovieService, SharedService, FilterService, PaginationService],
      imports: [HttpClientTestingModule], // Importar el módulo de pruebas de HttpClient
 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have a container for filters', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.filters')).toBeTruthy();
  });
  it('should have a container for items', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.body-page')).toBeTruthy();
  });

  it('should render an li for each item in displayData', () => {
    // Datos prueba
    const testData = [
      { original_title: 'Movie 1', release_date: '2022-01-01', poster_path: '/path1' },
      { original_title: 'Movie 2', release_date: '2022-02-01', poster_path: '/path2' } ];
    // datos de prueba a displayData
    component.displayData = testData;
    fixture.detectChanges();

    const liElements = fixture.nativeElement.querySelectorAll('.body-page ul li');

    expect(liElements.length).toBe(testData.length);

  });

  
  it('should render detailed view when an item is clicked', () => {
    const testItem = {
      original_title: 'Test Movie',
      release_date: '2022-01-01',
      poster_path: '/test_path',
      genre_ids: [1, 2]
    };

    // Objeto de prueba a displayData
    component.displayData = [testItem];
    fixture.detectChanges();

    const liElement = fixture.nativeElement.querySelector('.body-page ul li');

    liElement.click();
    fixture.detectChanges();

    expect(component.selectedItem).toEqual(testItem);

    const detailView = fixture.nativeElement.querySelector('.selectedFirst');
    expect(detailView).toBeTruthy();
  });

  it('should render a button to go back to the main page in the detailed view', () => {
    const testItem = {
      original_title: 'Test Movie',
      release_date: '2022-01-01',
      poster_path: '/test_path',
      genre_ids: [1, 2],
    };
  
    component.displayData = [testItem];
    fixture.detectChanges();

    const liElement = fixture.nativeElement.querySelector('.body-page ul li');
  
    liElement.click();
    fixture.detectChanges();

    expect(component.selectedItem).toEqual(testItem);
  
    const detailView = fixture.nativeElement.querySelector('.selectedFirst');
    expect(detailView).toBeTruthy();
  
    const backButton = fixture.nativeElement.querySelector('.backMovies');
    expect(backButton).toBeTruthy();
  });
});
