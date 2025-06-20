import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/services/housing.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
SellRent = 1;
  properties: any;

  constructor(private route: ActivatedRoute, private houseingService: HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString())
    {
      this.SellRent = 2 //means we are on rent-property URL else we are on base URL
    }
    this.houseingService.getAllProperties(this.SellRent).subscribe(
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
