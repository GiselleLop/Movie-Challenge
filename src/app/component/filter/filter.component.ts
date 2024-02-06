import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/services.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  genres: any = []
genresMap: { [key: number]: string } = {};
orderFilters: string[] = ['DESC' ,'ASC']

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getGenres().subscribe((genres) => {
      this.genres = genres;
      this.genres.genres.forEach((genre: { id: number; name: string }) => {
        this.genresMap[genre.id] = genre.name;
      });
    });
  }
}
