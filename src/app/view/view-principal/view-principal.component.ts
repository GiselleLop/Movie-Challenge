import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-principal',
  templateUrl: './view-principal.component.html',
  styleUrls: ['./view-principal.component.css']
})
export class ViewPrincipalComponent implements OnInit {

  showFooter: boolean = true;

  constructor(private sharedService: SharedService) { 

    this.sharedService.selectedItemEvent.subscribe((showFilters) => {
      console.log('Evento selectedItemEvent emitido. showFilters:', showFilters);


      this.showFooter = !showFilters; // Invierte el valor para mostrar u ocultar el footer
    });
  
  }

  ngOnInit(): void {
  }

}
