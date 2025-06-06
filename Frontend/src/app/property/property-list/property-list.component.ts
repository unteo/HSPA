import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/services/housing.service';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: any;

  constructor(private houseingService: HousingService) { }

  ngOnInit(): void {
    
    this.houseingService.getAllProperties().subscribe(
        data=>{
        this.properties=data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
