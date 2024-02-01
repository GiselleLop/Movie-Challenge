import { Component, OnInit } from '@angular/core';
import { movie } from 'src/app/interfaces/movie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-body-detail',
  templateUrl: './body-detail.component.html',
  styleUrls: ['./body-detail.component.css']
})
export class BodyDetailComponent implements OnInit {
  selectedItem: movie | null = null

  constructor(private router: Router) { }

  ngOnInit(): void { 
    const storedMovie = localStorage.getItem('selectedMovie');
    this.selectedItem = storedMovie ? JSON.parse(storedMovie) : null;
  }

  
  backToMovies() {
    this.selectedItem = null;
    localStorage.removeItem('selectedMovie');
    this.router.navigate(['/movies']);
  }
}
