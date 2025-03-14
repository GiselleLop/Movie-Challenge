import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-principal',
  templateUrl: './view-principal.component.html',
  styleUrls: ['./view-principal.component.scss']
})
export class ViewPrincipalComponent implements OnInit {
  showFooter: boolean = true;
  constructor(private sharedService: SharedService) {}
  
  ngOnInit(): void {
  }
}
