import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { movie } from 'src/app/interfaces/movie';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: movie | null = null
  @ViewChild('movieTitle') movieTitle!: ElementRef;
  @ViewChild('titleContainer') titleContainer!: ElementRef;
  constructor() { }

  ngOnInit(): void {}
  getMovieImage(): string {
    const image = this.movie?.poster_path 
    ? `https://image.tmdb.org/t/p/original/${this.movie.poster_path}` 
    : 'assets/images/noMovieImage.png';
    return image
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/noMovieImage.png';
  }
  
  ngAfterViewInit() {
    const h1Element = this.movieTitle.nativeElement;
    const containerElement = this.titleContainer.nativeElement;
    if (h1Element.scrollWidth > containerElement.clientWidth) {
      h1Element.classList.add('animated');
    }
  }
}
