import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, mergeMap,  expand, map, take, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private API_URL =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=5ffd5ac6e7c5a34ca73991e96f85a223';
  private MOVIE_GENRES =
    'https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=5ffd5ac6e7c5a34ca73991e96f85a223';

  constructor(private http: HttpClient) {}

  public getData(page: number): Observable<any> {
    const updateUrl = this.API_URL.replace('page=1', `page=${page}`);
    return of(updateUrl).pipe(mergeMap((url) => this.http.get<any>(url)));
  }

  public getDataAllPages(): Observable<any[]> { 
    const initialPage = 1;
    const maxPages = 30; 
    return this.getData(initialPage).pipe(
      expand((data, index) => {
        const nextPage = data.page + 1;
        return nextPage <= maxPages ? this.getData(nextPage) : of(null);
      }),
      take(maxPages),
      map(data => data.results),
      toArray(),
    );
  }

  public getGenres(): Observable<[]> {
    return this.http.get(this.MOVIE_GENRES) as Observable<[]>;
  }
}
