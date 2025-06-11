import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { IProperty } from 'src/app/property/IProperty.interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http:HttpClient) { }

getAllProperties(SellRent:number): Observable<IProperty[]> {
    return this.http.get("data/properties.json").pipe(
      map(data => {
        const propertiesArray: Array<IProperty> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id as keyof object]['SellRent'] === SellRent) {
            propertiesArray.push(data[id as keyof object]);
          }
        }
        return propertiesArray;
      })
    )
  }

}
