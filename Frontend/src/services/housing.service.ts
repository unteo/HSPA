import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { IAddress } from 'src/app/model/iaddress';



@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http:HttpClient) { }

getProperty(id: number){
  return this.getAllProperties().pipe(
    map(propertiesArray => {
      return propertiesArray.find(p => p.Id ===id);
    })
  );
}

 getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<Property> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp'));
      if(localProperties){
         for (const id in localProperties) {
          if(SellRent){
        if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
          propertiesArray.push(localProperties[id]);
        }
        }else{
          propertiesArray.push(localProperties[id]);
        }
      }
      }

      for (const id in data) {
        if(SellRent){
        if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
          propertiesArray.push(data[id]);
        }
      }else{
        propertiesArray.push(data[id]);
      }
    }

      return propertiesArray;
      })
    );

    return this.http.get<Property[]>('data/properties.json');
  }

  // METODA NOUĂ PENTRU ACTUALIZAREA ADRESEI

   updateAddress(propertyId: number, addressIndex: number, updatedAddress: IAddress) {
    // Preluăm proprietățile salvate local
    const localProperties = localStorage.getItem('newProp');

    if (localProperties) {
      // Convertim string-ul din localStorage într-un array de obiecte
      let propertiesArray: Property[] = JSON.parse(localProperties);

      // Găsim indexul proprietății pe care dorim să o modificăm
      const propertyIndexToUpdate = propertiesArray.findIndex(p => p.Id === propertyId);

      // Dacă am găsit proprietatea și adresa există
      if (propertyIndexToUpdate !== -1 && propertiesArray[propertyIndexToUpdate].Addresses[addressIndex]) {

        // Actualizăm adresa la indexul specificat
        propertiesArray[propertyIndexToUpdate].Addresses[addressIndex] = updatedAddress;

        // Salvăm înapoi în localStorage tot array-ul de proprietăți, acum modificat
        localStorage.setItem('newProp', JSON.stringify(propertiesArray));

        console.log('Adresa a fost actualizată cu succes în localStorage!');
      } else {
        console.error('Proprietatea sau adresa nu a fost găsită în localStorage.');
      }
    }
  }

  //METODA NOUA PENTRU STERGEREA UNEI ADRESE
  deleteAddress(propertyId: number, addressIndex: number) {
    const localProperties = localStorage.getItem('newProp');

    if (localProperties) {
      let propertiesArray: Property[] = JSON.parse(localProperties);
      const propertyIndexToUpdate = propertiesArray.findIndex(p => p.Id === propertyId);

      // Verificăm dacă proprietatea și adresa există
      if (propertyIndexToUpdate !== -1 && propertiesArray[propertyIndexToUpdate].Addresses[addressIndex]) {

        // Eliminăm adresa de la indexul specificat
        // .splice(index, 1) înseamnă: de la 'index', șterge '1' element
        propertiesArray[propertyIndexToUpdate].Addresses.splice(addressIndex, 1);

        // Salvăm înapoi în localStorage array-ul modificat
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
