import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { movie } from 'src/app/interfaces/movie';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: movie | null = null
  constructor() { }

  ngOnInit(): void {
  }

}
