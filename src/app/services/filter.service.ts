import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
    optionFilterSelectedSubject = new BehaviorSubject<number | undefined | string>("All");
  optionFilterSelected$ = this.optionFilterSelectedSubject.asObservable();

  orderSelectedSubject = new BehaviorSubject<string>("None");
  orderSelected$ = this.orderSelectedSubject.asObservable();

  inputSearchSubject = new BehaviorSubject<string>("");
  inputSearch$ = this.inputSearchSubject.asObservable();
  
  constructor() {}

  filterByGenre(data: movie[], type: number | string | undefined): movie[] {
    const filteredData = data.filter((movie: movie) =>
      movie.genre_ids.includes(Number(type))
    );
    const uniqueFilteredData = filteredData.filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    );
    return uniqueFilteredData;
  }

  orderData(data: movie[], selectedOrder: string): movie[] {
    let sortedData = [...data];

    if (selectedOrder === 'ASC') {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedOrder === 'DESC') {
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      sortedData.sort((a, b) => b.popularity - a.popularity);
    }

    return sortedData;
  }

  updateFilterOption(option: number | string) {
    this.optionFilterSelectedSubject.next(option);
  }

  updateOrderOption(order: string) {
    this.orderSelectedSubject.next(order);
  }

  searchMovie(data:movie[], nameMovie: string) {
    if (!nameMovie.trim()) {
      return data;
    }
  
    return data.filter(movie =>
      movie.title.toLowerCase().includes(nameMovie.toLowerCase())
    );
  }
}