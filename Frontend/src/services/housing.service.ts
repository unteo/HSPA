import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { IAddress } from 'src/app/model/iaddress';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HousingService {
  baseUrl = environment.baseUrl;

constructor(private http:HttpClient) { }

getAllCities(): Observable<string[]> {
  return this.http.get<string[]>('http://localhost:27151/api/city');
}

getProperty(id: number){
return this.http.get<Property>(this.baseUrl + '/property/detail/' + id.toString());
}

 getAllProperties(SellRent?: number): Observable<Property[]> {
   return this.http.get<Property[]>(this.baseUrl + '/property/list/' + SellRent.toString());
  }



   updateAddress(propertyId: number, addressIndex: number, updatedAddress: IAddress) {
    const localProperties = localStorage.getItem('newProp');

    if (localProperties) {
      let propertiesArray: Property[] = JSON.parse(localProperties);
      const propertyIndexToUpdate = propertiesArray.findIndex(p => p.id === propertyId);

      if (propertyIndexToUpdate !== -1 && propertiesArray[propertyIndexToUpdate].Addresses[addressIndex]) {

        propertiesArray[propertyIndexToUpdate].Addresses[addressIndex] = updatedAddress;
        localStorage.setItem('newProp', JSON.stringify(propertiesArray));
        console.log('Address successfully updated in localStorage!');
      } else {
        console.error('Property or address not found in localStorage.');
      }
    }
  }

  deleteAddress(propertyId: number, addressIndex: number) {
    const localProperties = localStorage.getItem('newProp');

    if (localProperties) {
      let propertiesArray: Property[] = JSON.parse(localProperties);
      const propertyIndexToUpdate = propertiesArray.findIndex(p => p.id === propertyId);

      if (propertyIndexToUpdate !== -1 && propertiesArray[propertyIndexToUpdate].Addresses[addressIndex]) {

        propertiesArray[propertyIndexToUpdate].Addresses.splice(addressIndex, 1);

        localStorage.setItem('newProp', JSON.stringify(propertiesArray));
        console.log('Adresa a fost ștearsă cu succes din localStorage!');
      } else {
        console.error('Proprietatea sau adresa nu a fost găsită pentru ștergere.');
      }
    }
  }

  addProperty(property: Property){
    let newProp = [property];

    //Add new property in array if newProp already exists in local storage
    if (localStorage.getItem('newProp')){
      newProp = [property,
                ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    }else
    {localStorage.setItem('PID', '101');
      return 101;
    }

  }
}
