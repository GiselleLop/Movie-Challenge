import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
@Input() btnName: string | undefined | number 
@Input() btnClass: string | undefined = ''
@Input() btnSelected: number | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
