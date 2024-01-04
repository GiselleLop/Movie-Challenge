import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterByGenre(data: any[], type: number): any[] {
    return data.filter((element: any) => element.genre_ids.includes(Number(type)));
  }
  
}

