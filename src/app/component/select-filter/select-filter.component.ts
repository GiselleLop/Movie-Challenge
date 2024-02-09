import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css']
})
export class SelectFilterComponent implements OnInit {
constructor(private filterService:FilterService) {
}

@Input() optionsGenre:{ [key: number]: string } = {};
@Input() genres: any = null
@Input() narmeByOrder:undefined | string[] = undefined

  ngOnInit(): void {}

  filterData(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
  this.filterService.optionFilterSelectedSubject.next(selectedValue)
  }
}
