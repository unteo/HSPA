import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { IAddress } from 'src/app/model/iaddress';
import { AuthService } from 'src/services/auth.service';

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

editingAddressIndex: number | null = null;
editableAddress: IAddress = null;
 isUserLoggedIn = false;

  constructor( private route : ActivatedRoute,
  private router : Router,
  private housingService: HousingService,
  private authService : AuthService) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      }
    );

    this.isUserLoggedIn = this.authService.isLoggedIn();
   

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
    this.editableAddress = JSON.parse(JSON.stringify(this.property.Addresses[index]));
  }
   saveEdit(): void {
    if (this.editableAddress && this.editingAddressIndex !== null) {
      this.housingService.updateAddress(this.property.Id, this.editingAddressIndex, this.editableAddress);
      this.property.Addresses[this.editingAddressIndex] = this.editableAddress;
      this.cancelEdit();
    }
  }

  onDeleteAddress(index: number): void {
  
    const confirmation = confirm('Are you sure you want to delete this address? This action cannot be undone.');
    
    if (confirmation) {
      this.housingService.deleteAddress(this.property.Id, index);
      this.property.Addresses.splice(index, 1);
      console.log(`Address at index ${index} was deleted.`);
    }
  }

  cancelEdit(): void {
    this.editingAddressIndex = null;
    this.editableAddress = null;
  }
}
