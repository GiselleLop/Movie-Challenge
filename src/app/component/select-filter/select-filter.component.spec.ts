import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterService } from 'src/app/services/filters.service';
import { BehaviorSubject } from 'rxjs';
import { SelectFilterComponent } from './select-filter.component';

describe('SelectFilterComponent', () => {
  let component: SelectFilterComponent;
  let fixture: ComponentFixture<SelectFilterComponent>;
  let filterService: FilterService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFilterComponent ], 
      providers: [FilterService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilterComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should send selected value to filterService', () => {
    const selectedValue = 'action'; // Valor seleccionado simulado
 spyOn(filterService.optionFilterSelectedSubject, 'next').and.callThrough();
   const event: unknown = {
      target: {
        value: selectedValue
      }
    };
    component.filterData(event as Event);
    expect(filterService.optionFilterSelectedSubject.next).toHaveBeenCalledWith(selectedValue);
  });
});
