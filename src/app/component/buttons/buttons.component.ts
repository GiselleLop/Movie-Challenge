import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
@Input() btnName: string | undefined
@Input() btnClass: string | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
