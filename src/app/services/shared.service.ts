import { Injectable, EventEmitter } from '@angular/core';
import {BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
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

  selectedItemEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
}
