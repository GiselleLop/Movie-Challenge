import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { SharedService } from 'src/app/services/shared.service';
import { movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

dataSubscription: Subscription = new Subscription()
  totalItems: number = 0;
  pageSelected: number = 0;

  totalPages: number = 0;
  pages: number[] = [];
  displayData: movie[] = [];

  constructor(
    private sharedService: SharedService,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedService.pageSelected$.subscribe((page) => {
        this.pageSelected = page;
      })
    )

    this.sharedService.filteredData$.subscribe((filteredData) => {
      this.totalItems = filteredData.flat().length;
      this.updatePagination();
    })

    this.dataSubscription = this.movieService.getDataAllPages().subscribe((data) => {
      this.totalItems = data.flat().length;
      this.updatePagination();
    });

  }
  ngOnDestroy(): void {
    if(this.dataSubscription) {
    this.dataSubscription.unsubscribe()
    }
  }
  
  updatePagination() {
    this.totalPages = Math.ceil(this.totalItems / 20);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i );
  }


  onPageChange(event: any) {    
    this.pageSelected = event.page;
    this.sharedService.pageSelectedSubject.next(this.pageSelected )
  }
}
