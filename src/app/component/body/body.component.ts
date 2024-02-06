import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/services.service';
import { SharedService } from 'src/app/services/shared.service';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/services/filters.service';
import { movie } from 'src/app/interfaces/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit, OnDestroy {
  private AllDataSubscription: Subscription | undefined;

  currentPage: number = 1;
  dataAllPages: movie[] = [];
  dataPeerPage: movie[] = [];
  pageSelected: number = 1;
  dataPrincipal: movie[] = [];

  constructor(
    private movieService: MovieService,
    private sharedService: SharedService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.movieService.getDataAllPages().subscribe((data) => {
      this.dataAllPages = data.flat();
     this.dataPrincipal = data.flat();
      this.moviesPeerPage()
      console.log(this.dataPeerPage);
     });

     this.sharedService.pageSelected$.subscribe((page) => {
      this.pageSelected = page;
   this.moviesPeerPage()
    });

    this.sharedService.filteredData$.subscribe((data) => {
      this.dataAllPages = data;
      this.moviesPeerPage();
    });

    this.filterService.optionFilterSelected$.subscribe(gender => {
      if (gender === 'All') {
      this.dataAllPages = this.dataPrincipal;
        this.sharedService.updateFilteredData(this.dataAllPages);
      } else if (!isNaN(Number(gender))){
        this.dataAllPages = this.filterService.filterByGenre(
          this.dataPrincipal,
          gender)
       
        if (this.dataAllPages.length === 0) {
          alert('No movies were found with this genre');
        }
        this.sharedService.updateFilteredData(this.dataAllPages);
        
      }
      else if (gender === 'ASC' || gender === 'DESC') {
      this.getDataAsc()
      }
    })
  }

  ngOnDestroy(): void {
    this.AllDataSubscription?.unsubscribe();
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

  getDataAsc() {
    this.sharedService.updateFilteredData(this.dataAllPages.reverse());
  }
}
