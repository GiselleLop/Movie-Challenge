import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private currentPage = 1;
  
  getPage(): number {
    return this.currentPage;
  }
  
  filterByGenre(genres: any[], type: number): any[] {
    return genres.filter((element: any) => element.id === type);
  }

  pageSelectedSubject = new BehaviorSubject<number>(1);
  pageSelected$ = this.pageSelectedSubject.asObservable();
  
  paginatorData(pageSelected:number, data:movie[]) {
    const start = (pageSelected - 1) * 20;
    const end = start + 20;
    return data.slice(start, end);
  }

  updateFilteredData(data: movie[]) {
    this.dataFilteredRender.next(data);
  }

  private dataFilteredRender = new BehaviorSubject<movie[]>([]);
  filteredData$ = this.dataFilteredRender.asObservable();

  
}
