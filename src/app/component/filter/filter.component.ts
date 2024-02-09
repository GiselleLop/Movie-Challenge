import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/services.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit,  OnDestroy {
  genresSubscription: Subscription = new Subscription()
  genres: any = []
genresMap: { [key: number]: string } = {};
orderFilters: string[] = ['DESC' ,'ASC']

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
   this.genresSubscription = this.movieService.getGenres().subscribe((genres) => {
    console.log(genres, 'genres');
    
      this.genres = genres;
      this.genres.genres.forEach((genre: { id: number; name: string }) => {
        this.genresMap[genre.id] = genre.name;
      });
    });
  }
  ngOnDestroy(): void {
    if (this.genresSubscription) {
      this.genresSubscription.unsubscribe();
    }
  }
}
