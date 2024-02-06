import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/services.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  totalItems: any = [];
  data: any = [];
  //itemsPerPage: number = 20;
  pageSelected: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  displayData: any = [];

  constructor(
    private sharedService: SharedService,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    
    this.sharedService.filteredData$.subscribe((filteredData) => {
      this.data = filteredData;
    console.log(this.data, ' filtered actualizacion en footer');
    this.updatePagination();
    })

    this.movieService.getDataAllPages().subscribe((data) => {
      this.totalItems = data.flat().length;
      this.data = data.flat();
      this.updatePagination();
      console.log(this.totalItems);
      
    });

  }
  
  updatePagination() {
    this.totalPages = Math.ceil(this.data.length / 20);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
   // this.paginatorData();
  }

  changePage(page: number) {
    this.pageSelected = page
    this.sharedService.pageSelectedSubject.next(page)
    //this.paginatorData();a
  }

  // paginatorData() {
  //   const start = (this.pageSelected - 1) * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   this.displayData = this.data.slice(start, end);
  //   this.sharedService.updateDisplayData(this.displayData);
  // }
}
