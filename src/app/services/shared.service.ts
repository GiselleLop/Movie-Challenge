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

  pageSelectedSubject = new BehaviorSubject<number>(0);
  pageSelected$ = this.pageSelectedSubject.asObservable();
  
  private filteredDataSubject = new BehaviorSubject<movie[]>([]);
  filteredData$ = this.filteredDataSubject.asObservable();

  paginatorData(pageSelected:number, data:movie[]) {
    const start = (pageSelected ) * 20;
    const end = start + 20;
    return data.slice(start, end);
  }
  
  updateFilteredData(data: movie[]) {
    this.filteredDataSubject.next(data);//
  }

  updatePageSelected(page: number) {
    this.pageSelectedSubject.next(page);
  }

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
}
