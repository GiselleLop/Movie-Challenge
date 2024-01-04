import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
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
  it('should render an li for each page', () => {
    // Datos prueba
    const pageTest: any = [1, 2, 3, 4, 5] 
    component.pages = pageTest;
    fixture.detectChanges();
    const liElements = fixture.nativeElement.querySelectorAll('.footer-page ul li');
    expect(liElements.length).toBe(pageTest.length);
  });
  it('should call changePage function when a page is clicked', () => {
     const testPages = [1, 2, 3, 4, 5];
    component.pages = testPages;
    fixture.detectChanges();
  const pageElement = fixture.nativeElement.querySelector('.pagination li');
    spyOn(component, 'changePage');
  
    // Simula un clic en el elemento de la página
    pageElement.click();
    fixture.detectChanges();
  
    // Verifica que la función changePage haya sido llamada
    expect(component.changePage).toHaveBeenCalled();
  });
});
