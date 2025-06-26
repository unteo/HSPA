import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/services/alertify.service';
import { HousingService } from 'src/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
//@ViewChild('Form') addPropertyForm: NgForm;
 @ViewChild('formTabs') formTabs?: TabsetComponent;

 addPropertyForm: FormGroup;
 nextClicked: boolean;
 property = new Property();

 //Will come from masters
 propertyTypes: Array<string> = ['House', 'Apartament', 'Duplex'];
 furnishedTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

 propertyView: IPropertyBase = {
  Id: null,
  Name: '',
  Price: null,
  SellRent: null,
  PType: null,
  FType: null,
  BHK: null,
  BuiltArea: null,
  City: null,
  RTM: null
 };

   selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if(IsCurrentTabValid){
    this.formTabs.tabs[tabId].active = true;
  }
  }

 tmpProp= {}
  constructor(
    private router : Router,
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
    BasicInfo: this.fb.group({
      SellRent: [null, Validators.required],
      BHK: [null, Validators.required],
      PType: [null, Validators.required],
      FType: [null, Validators.required],
      Name: [null, Validators.required],
      City: [null, Validators.required],
      }),
    PriceInfo: this.fb.group({
      Price: [null, Validators.required],
      BuiltArea: [null, Validators.required],
      CarpetArea: [null],
      Security: [null],
      Maintenance: [null],
      }),
      AddressInfo: this.fb.group({
         Addresses: this.fb.array([this.createAddressGroup()])
      }),
    OtherInfo: this.fb.group({
      RTM: [null,Validators.required],
      PossessionOn: [null],
      AOP: [null],
      Gated: [null],
      MainEntrance: [null],
      Description: [null],


    })
    })
  }

    createAddressGroup(): FormGroup {
    return this.fb.group({
      Address: [null, Validators.required],
      ZipCode: [null, [Validators.required,]], 
      TotalFloor: [null, [Validators.required, Validators.min(1)]],
      Floor: [null, [Validators.required, Validators.min(0)]],
      Landmark: [null],
    });
  }


   addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

    removeAddress(index: number): void {
    if (this.addresses.length > 1) { 
      this.addresses.removeAt(index);
    }
  }


  
//#region <Getter Methods>
 // #region <FormGroups>
      get BasicInfo() {
        return this.addPropertyForm.controls.BasicInfo as FormGroup;
      }

      get PriceInfo() {
        return this.addPropertyForm.controls.PriceInfo as FormGroup;
      }

      get AddressInfo() {
        return this.addPropertyForm.controls.AddressInfo as FormGroup;
      }

      get OtherInfo() {
        return this.addPropertyForm.controls.OtherInfo as FormGroup;
      }
      get addresses(): FormArray {
        return this.addPropertyForm.get('AddressInfo.Addresses') as FormArray;
      }

  // #endregion
  //#region <Form Controls>
      get SellRent() {
        return this.BasicInfo.controls.SellRent as FormControl;
      }

      get BHK() {
        return this.BasicInfo.controls.BHK as FormControl;
      }

      get PType() {
        return this.BasicInfo.controls.PType as FormControl;
      }

      get FType() {
        return this.BasicInfo.controls.FType as FormControl;
      }

      get Name() {
        return this.BasicInfo.controls.Name as FormControl;
      }

      get City() {
        return this.BasicInfo.controls.City as FormControl;
      }

      get Price() {
        return this.PriceInfo.controls.Price as FormControl;
      }

      get BuiltArea() {
        return this.PriceInfo.controls.BuiltArea as FormControl;
      }

      get CarpetArea() {
        return this.PriceInfo.controls.CarpetArea as FormControl;
      }

      get Security() {
        return this.PriceInfo.controls.Security as FormControl;
      }

      get Maintenance() {
        return this.PriceInfo.controls.Maintenance as FormControl;
      }

      get RTM() {
        return this.OtherInfo.controls.RTM as FormControl;
      }

      get PossessionOn() {
        return this.OtherInfo.controls.PossessionOn as FormControl;
      }

      get AOP() {
        return this.OtherInfo.controls.AOP as FormControl;
      }

      get Gated() {
        return this.OtherInfo.controls.Gated as FormControl;
      }

      get MainEntrance() {
        return this.OtherInfo.controls.MainEntrance as FormControl;
      }

      get Description() {
        return this.OtherInfo.controls.Description as FormControl;
      }

  //#endregion
//#endregion
  
onSubmit(){

    this.nextClicked = true;
  
    if(this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);

      if(this.SellRent.value === '2'){
        this.router.navigate(['/rent-property'])
      }else {
        this.router.navigate(['/']);
      }
    }
    else {
      this.alertify.error('Please review the form and provide all valid');
    }
    console.log('Congrats, form Submitted');
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
    console.log("--------------------");
    
  }

  mapProperty(): void {

    this.property.Id = this.housingService.newPropID();
    // --- Mapare din BasicInfo ---
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.FType = this.FType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;

    // --- Mapare din PriceInfo ---
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;

    // --- MApare din Address ---
    this.property.Addresses = this.addPropertyForm.value.AddressInfo.Addresses;

    // --- MApare din Other Details ---
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;

    this.property.PostedOn = new Date().toString();

  }

  allTabsValid(): boolean {
    if(this.BasicInfo.invalid){
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if(this.PriceInfo.invalid){
      this.formTabs.tabs[1].active = true;
      return false;
    }

   if (this.AddressInfo.invalid) {
    this.formTabs.tabs[2].active = true;
    return false;
  }
     
    if(this.OtherInfo.invalid){
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  onBack()
  {
    this.router.navigate(['/']);
  }
}
