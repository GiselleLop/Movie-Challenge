import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyDetailComponent } from './body-detail.component';

describe('BodyDetailComponent', () => {
  let component: BodyDetailComponent;
  let fixture: ComponentFixture<BodyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
