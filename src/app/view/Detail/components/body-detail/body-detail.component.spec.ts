import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BodyDetailComponent } from './body-detail.component';
import { Router } from '@angular/router';
describe('BodyDetailComponent', () => {
  let component: BodyDetailComponent;
  let fixture: ComponentFixture<BodyDetailComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect to /detail-movie when a movie is clicked', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.backToMovies();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
