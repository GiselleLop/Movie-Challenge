import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { movie } from 'src/app/interfaces/movie';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  
  currentPage: number = 1;
  dataAllPages: movie[] = [];
  dataPeerPage: movie[] = [];
  pageSelected: number = 0;
  dataPrincipal: movie[] = [];
  loading: boolean = false;

  constructor(
    private movieService: MovieService,
    private sharedService: SharedService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading= true
    this.subscriptions.add(
      this.movieService.getDataAllPages().subscribe((data) => {
        this.dataAllPages = data.flat().filter((movie, index, self) =>
          index === self.findIndex(m => m.id === movie.id)
        );
        this.dataPrincipal = [...this.dataAllPages]; 
        this.moviesPeerPage()
        this.loading = false
      })
    ); 

    this.subscriptions.add(
      this.sharedService.pageSelected$.subscribe((page) => {
        this.pageSelected = page;
        this.moviesPeerPage()
      })
    )
     
    this.subscriptions.add(
      this.sharedService.filteredData$.subscribe((data) => {
        this.dataAllPages = data;
        this.moviesPeerPage();
      })
    )

    this.subscriptions.add(
      this.filterService.optionFilterSelected$.subscribe(gender => {
        if (gender === 'All') {
          this.dataAllPages = this.dataPrincipal;
          this.sharedService.updateFilteredData(this.dataAllPages);
        } else if (!isNaN(Number(gender))){
          this.dataAllPages = this.filterService.filterByGenre(this.dataPrincipal, gender)
          this.sharedService.updateFilteredData(this.dataAllPages);
        }
      })
    )

    this.subscriptions.add(
      this.filterService.orderSelected$.subscribe((order) => {
        this.dataAllPages = this.filterService.orderData(this.dataAllPages, order);
        this.sharedService.updateFilteredData(this.dataAllPages);
      })
    )

    this.subscriptions.add(
      this.filterService.inputSearch$.subscribe((value) => {
        this.dataAllPages = this.filterService.searchMovie(this.dataPrincipal, value);
        this.sharedService.updateFilteredData(this.dataAllPages);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  moviesPeerPage() {
    this.dataPeerPage = this.sharedService.paginatorData(
      this.pageSelected,
      this.dataAllPages
    );    
  }

  viewDetailMovie(item: movie) {
    localStorage.setItem('selectedMovie', JSON.stringify(item));
    this.redirectToDetailView();
  }

  redirectToDetailView() {
    this.router.navigate(['/movie-detail']);
  }
}
