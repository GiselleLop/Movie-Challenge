import { Injectable } from '@angular/core';
import { movie } from '../interfaces/movie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  optionFilterSelectedSubject = new BehaviorSubject<
    number | undefined | string
  >(undefined);
  optionFilterSelected$ = this.optionFilterSelectedSubject.asObservable();

  filterByGenre(data: movie[], type: number | string | undefined): movie[] {
    const filteredData = data.filter((movie: movie) =>
      movie.genre_ids.includes(Number(type))
    );
    const uniqueFilteredData = filteredData.filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    );
    return uniqueFilteredData;
  }
}
