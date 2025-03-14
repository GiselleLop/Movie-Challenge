import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit,  OnDestroy {
  genresSubscription: Subscription = new Subscription()
  genres: {id: number, name: string}[] = [];
  orderFilters: string[] = ['None', 'DESC' ,'ASC']
  selectedGenre: string | number = 'All';
  selectedOrder: string = 'None';
  searchTerm: string = '';

  constructor(private movieService: MovieService, private filterService: FilterService) { }

  ngOnInit(): void {
   this.genresSubscription = this.movieService.getGenres().subscribe((genres) => {
      this.genres = genres.genres;
    });

    this.filterService.optionFilterSelected$.subscribe((genre) => {
      this.selectedGenre = genre as string | number;
    });

    this.filterService.orderSelected$.subscribe((order) => {
      this.selectedOrder = order as string;
    });
  }

  onSearchMovie() {
    this.filterService.inputSearchSubject.next(this.searchTerm)
  }

  filterData(type: string, event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if(type === "genre") {
      this.selectedGenre = selectedValue;
      this.filterService.optionFilterSelectedSubject.next(selectedValue)

    } if (type === "order") {
      this.selectedOrder = selectedValue;
      this.filterService.orderSelectedSubject.next(selectedValue);
    }
  }

  clearFilter() {
    this.selectedGenre = 'All';
    this.selectedOrder = 'None';
    this.searchTerm = '';

    this.filterService.optionFilterSelectedSubject.next(this.selectedGenre);
    this.filterService.orderSelectedSubject.next(this.selectedOrder);
    this.filterService.inputSearchSubject.next(this.searchTerm)
  }

  ngOnDestroy(): void {
    if (this.genresSubscription) {
      this.genresSubscription.unsubscribe();
    }
  }
}
