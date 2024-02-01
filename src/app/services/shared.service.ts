import { Injectable, EventEmitter } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // selectedItemSource = new BehaviorSubject<movie | null>( null);
  // selectedItem$ = this.selectedItemSource.asObservable();
  

  selectedItemEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  private currentPage = 1;
  
  getPage(): number {
    return this.currentPage;
  }
  
  filterByGenre(genres:any[], type: number) {
    return genres.filter((element:any) => element.includes(type));
  }

  updateDisplayData(data: any[]) {
    this.displayDataSubject.next(data);
  }
  private displayDataSubject = new BehaviorSubject<any[]>([]);
  displayData$ = this.displayDataSubject.asObservable();

  updateFilteredData(data: any[]) {
    this.dataFilteredRender.next(data);
  }

  private dataFilteredRender = new BehaviorSubject<any[]>([]);
  filteredData$ = this.dataFilteredRender.asObservable();

  
}
