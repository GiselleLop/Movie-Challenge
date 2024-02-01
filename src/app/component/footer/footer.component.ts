import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/services.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentPage: number = 1;
  totalItems: any = [];
  data: any = [];
  itemsPerPage: number = 20;
  page: number = 1;
  totalPages: number = 0;
  pages: any = [];
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
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatorData();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginatorData();
  }

  paginatorData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayData = this.data.slice(start, end);
    this.sharedService.updateDisplayData(this.displayData);
  }
}
