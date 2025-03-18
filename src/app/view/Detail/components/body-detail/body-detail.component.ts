import { Component, OnInit } from '@angular/core';
import { movie } from 'src/app/interfaces/movie';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { MovieService } from 'src/app/services/movie.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-body-detail',
  templateUrl: './body-detail.component.html',
  styleUrls: ['./body-detail.component.scss']
})
export class BodyDetailComponent implements OnInit {
  genresSubscription: Subscription = new Subscription()
  selectedItem: movie | null = null
  movieAge: string | null = null
  movieGender: string | null = null

  constructor(private router: Router,   private sharedService: SharedService, private movieService: MovieService) { }

  ngOnInit(): void { 
   
    const storedMovie = localStorage.getItem('selectedMovie');
    this.selectedItem = storedMovie ? JSON.parse(storedMovie) : null;
   
    this.genresSubscription = this.movieService.getGenres().subscribe((genres) => {
      this.movieGender = this.selectedItem ?  this.sharedService.getGenderMovie(this.selectedItem.genre_ids, genres.genres): null         
    })

    this.movieAge = this.selectedItem ? this.sharedService.getAgeMovie(this.selectedItem) : null    
  }

  getMovieImage(): string {
    const image = this.selectedItem?.poster_path 
    ? `https://image.tmdb.org/t/p/original/${this.selectedItem.poster_path}` 
    : 'assets/images/noMovieImage.png';
    return image
  }

  backToMovies() {
    this.selectedItem = null;
    localStorage.removeItem('selectedMovie');
    this.router.navigate(['/']);
  }
}
