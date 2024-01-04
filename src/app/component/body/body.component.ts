import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/services.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/services/filters.service';
import { PaginationService } from 'src/app/services/paginator.service';
//import { log } from 'util';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit, OnDestroy {
  private AllDataSubscription: Subscription | undefined;

  currentPage: number = 1;
  dataAllPages: any = [];
  data: any = [];
  pages: any = {};
  genres: any = {};
  filteredData: any = [];
  selectedGenre: any = [];
  displayData: any = [];
  selectedItem: any = null;
  showFilters: boolean = true;
  genresMap: { [key: number]: string } = {};
  stars:any = [];

  constructor(
    private movieService: MovieService,
    private sharedService: SharedService,
    private filterService: FilterService,
    private paginationService: PaginationService
  ) {
    this.sharedService.selectedItemEvent.subscribe((showFilters) => {
      this.showFilters = showFilters;
    });
  }

  ngOnInit(): void {
    this.selectedGenre = 'All';
    this.getGenresList();
    this.paginationService.currentPage$.subscribe((page) => {
      this.currentPage = page;
    });

    this.sharedService.displayData$.subscribe((displayData) => {
      this.displayData = displayData;
    });

      this.movieService.getDataAllPages().subscribe((data) => {
        this.dataAllPages = data.flat();
        this.filteredData = this.dataAllPages;
      });
  }

  ngOnDestroy(): void {
    this.AllDataSubscription?.unsubscribe();
  }

  
  getGenresList() {
    this.movieService.getGenres().subscribe((genres) => {
      this.genres = genres;
     
        this.genres.genres.forEach((genre: { id: number; name: string }) => {
          this.genresMap[genre.id] = genre.name;
        });
      
    });
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  filterData() {
    if (this.selectedGenre !== 'All') {
      this.filteredData = this.filterService.filterByGenre( this.dataAllPages, this.selectedGenre);
      console.log(this.filteredData, '  filtered');
      if (this.filteredData.length === 0) {
        alert('No movies were found with this genre');
      }
      this.sharedService.updateFilteredData(this.filteredData);
    } else {
      this.filteredData = this.dataAllPages;
      this.sharedService.updateFilteredData(this.filteredData);
    
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.sharedService.selectedItemEvent.emit(true);
    this.showFilters = false;
   this.getStarsOfMovies(this.selectedItem.vote_average)
  }
  
  backToMovies() {
    this.selectedItem = null;
    this.sharedService.selectedItemEvent.emit(false);
    this.showFilters = true;
  }

  getGenres(genreIds: number[]): string {
    return genreIds.map((id) => this.genresMap[id]).join(', ');
  }

  getStarsOfMovies(stars: number): any {
    const decimalPart = stars - Math.floor(stars);
    const integerPart = Math.floor(stars);
    const starsArray: number[] = [];

  if (decimalPart > 0) {
    starsArray.push(Number(decimalPart.toFixed(1)));
  }
  if (integerPart > 0) {
     for (let i = 1; i <= integerPart; i++) {
      starsArray.push(i);
    }
  }
    this.stars.push(...starsArray);

    return starsArray;
  }

  handleOrderChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'ASC') {
      this.getDataAsc();
    } else if (selectedValue === 'DESC') {
      this.getDataAsc();
    } 
  }

  getDataAsc() {

  //  this.sharedService.updateDisplayData(this.dataAllPages)
    this.sharedService.updateFilteredData(this.filteredData.reverse());
  }
}
