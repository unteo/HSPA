import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { IAddress } from 'src/app/model/iaddress';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
public propertyId: number;
property = new Property;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];

//variabile pentru starea de editare
editingAddressIndex: number | null = null;
editableAddress: IAddress = null;

  constructor( private route : ActivatedRoute,
  private router : Router,
  private housingService: HousingService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );

   
  //   this.route.params.subscribe(
  //   (params) => {
  //     this.propertyId = +params['id'];
  //     this.housingService.getProperty(this.propertyId).subscribe(
  //     (data: Property) => {
  //         this.property = data;
  //       }
  //     )
  //   }
  // );
   this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/internal-1.jpg',
        medium: 'assets/images/internal-1.jpg',
        big: 'assets/images/internal-1.jpg'
      },
      {
        small: 'assets/images/internal-2.jpg',
        medium: 'assets/images/internal-2.jpg',
        big: 'assets/images/internal-2.jpg'
      },
      {
        small: 'assets/images/internal-1.jpg',
        medium: 'assets/images/internal-1.jpg',
        big: 'assets/images/internal-1.jpg'
      },
      {
        small: 'assets/images/internal-2.jpg',
        medium: 'assets/images/internal-2.jpg',
        big: 'assets/images/internal-2.jpg'
      },
      {
        small: 'assets/images/internal-1.jpg',
        medium: 'assets/images/internal-1.jpg',
        big: 'assets/images/internal-1.jpg'
      }
    ];

  
  }  
   startEdit(index: number): void {
    this.editingAddressIndex = index;
    // Creăm o copie a obiectului pentru a evita modificarea directă înainte de salvare
    // Acest lucru previne actualizarea automată a afișajului în caz de anulare
    this.editableAddress = JSON.parse(JSON.stringify(this.property.Addresses[index]));
  }
   saveEdit(): void {
    if (this.editableAddress && this.editingAddressIndex !== null) {
      // 1. Apelăm serviciul pentru a salva datele în localStorage
      this.housingService.updateAddress(this.property.Id, this.editingAddressIndex, this.editableAddress);

      // 2. Actualizăm datele și în componenta locală pentru a reflecta imediat schimbarea
      this.property.Addresses[this.editingAddressIndex] = this.editableAddress;

      // 3. Resetăm starea de editare
      this.cancelEdit();
    }
  }

   // -- START: Metoda pentru ștergere --
  onDeleteAddress(index: number): void {
    // Cerem confirmare de la utilizator
    const confirmation = confirm('Sunteți sigur că doriți să ștergeți această adresă? Acțiunea este ireversibilă.');
    
    if (confirmation) {
      // 1. Apelăm serviciul pentru a șterge adresa din localStorage
      this.housingService.deleteAddress(this.property.Id, index);

      // 2. Actualizăm array-ul local pentru a reflecta schimbarea în UI imediat
      this.property.Addresses.splice(index, 1);

      console.log(`Adresa de la indexul ${index} a fost ștearsă.`);
    }
  }

  cancelEdit(): void {
    this.editingAddressIndex = null;
    this.editableAddress = null;
  }
  // -- SFÂRȘIT: Metode pentru editare --
}
