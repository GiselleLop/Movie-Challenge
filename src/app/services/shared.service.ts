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

  pageSelectedSubject = new BehaviorSubject<number>(1);
  pageSelected$ = this.pageSelectedSubject.asObservable();
  
  private filteredDataSubject = new BehaviorSubject<movie[]>([]);
  filteredData$ = this.filteredDataSubject.asObservable();

  paginatorData(pageSelected:number, data:movie[]) {
    const start = (pageSelected - 1) * 20;
    const end = start + 20;
    return data.slice(start, end);
  }
  // paginatorData(page: number, data: movie[]): movie[] {
  //   const itemsPerPage = 10;
  //   const startIndex = (page - 1) * itemsPerPage;
  //   return data.slice(startIndex, startIndex + itemsPerPage);
  // }//
  
  updateFilteredData(data: movie[]) {
    this.filteredDataSubject.next(data);//
  }
updatePageSelected(page: number) {
    this.pageSelectedSubject.next(page);
  }//
  getAgeMovie(movie: movie) {
    const movieSeparate: string[] = movie.release_date.split("-")
    return movieSeparate[0]
  }

  getGenderMovie(genres_id_movie: number[], genres:{id: number, name: string}[]): string {    
    return genres
    .filter(genre => genres_id_movie.includes(genre.id)) 
    .map(genre => genre.name)
    .join(", ");
  }

  // private dataFilteredRender = new BehaviorSubject<movie[]>([]);
  // filteredData$ = this.dataFilteredRender.asObservable();
}
