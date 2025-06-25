import { NgForOf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Iproperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

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
 addressReactiveForm: FormGroup;

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
  constructor(private router : Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.createAddressReactiveForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
    BasicInfo: this.fb.group({
      SellRent: [1, Validators.required],
      PType: [null, Validators.required],
      FType: [null, Validators.required],
      Name: [null, Validators.required],
      City: [null, Validators.required],
      }),
    PriceInfo: this.fb.group({
      Price: [null, Validators.required],
      BuiltArea: [null, Validators.required],
      CarpetArea: [null, Validators.required],
      Security: [null, Validators.required],
      Maintenance: [null, Validators.required],
      }),
    OtherInfo: this.fb.group({
      RTM: [null,Validators.required],
      PosessionOn: [null],
      AOP: [null],
      Gated: [null],
      MainEntrance: [null],
      Description: [null],


    })
    })
  }

   createAddressReactiveForm() {
    this.addressReactiveForm = this.fb.group({
      Addresses: this.fb.array([this.createAddressGroup()]) 
    });
  }

    createAddressGroup(): FormGroup {
    return this.fb.group({
      Address: [null, Validators.required],
      ZipCode: [null, [Validators.required,]], 
      TotalFloor: [null, [Validators.required, Validators.min(1)]],
      Floor: [null, [Validators.required, Validators.min(0)]],
      Landmark: [null]
    });
  }

   get addresses(): FormArray {
    return this.addressReactiveForm.get('Addresses') as FormArray;
  }

   addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

    removeAddress(index: number): void {
    if (this.addresses.length > 1) { 
      this.addresses.removeAt(index);
    } else {
      alert('Este necesară cel puțin o adresă.');
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

      // get AddressInfo() {
      //   return this.addPropertyForm.controls.AddressInfo as FormGroup;
      // }

      get OtherInfo() {
        return this.addPropertyForm.controls.OtherInfo as FormGroup;
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

      // get FloorNo() {
      //   return this.AddressInfo.controls.FloorNo as FormControl;
      // }

      // get TotalFloor() {
      //   return this.AddressInfo.controls.TotalFloor as FormControl;
      // }

      // get Address() {
      //   return this.AddressInfo.controls.Address as FormControl;
      // }

      // get LandMark() {
      //   return this.AddressInfo.controls.LandMark as FormControl;
      // }

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
      console.log('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);
    }
    else {
      console.log('Please review the form and provide all valid');
    }
    console.log('Congrats, form Submitted');
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
    console.log("--------------------");
    //  console.log('Formularul principal (NgForm) value:', Form.value);
    // console.log('Formularul de Adrese (Reactive Form) value:', this.addressReactiveForm.value);

    //  if (Form.valid && this.addressReactiveForm.valid) {
    //   const ngFormData = Form.value;
    //   const reactiveAddressData = this.addressReactiveForm.value;

    //  const newProperty: Iproperty = {
    //       Id: 0, 
    //       SellRent: ngFormData.BasicInfo.SellRent,
    //       Name: ngFormData.BasicInfo.Name,
    //       PType: ngFormData.BasicInfo.propType,
    //       FType: ngFormData.BasicInfo.FType,
    //       Price: ngFormData.price,
    //       BHK: ngFormData.BasicInfo.BHK,
    //       BuiltArea: ngFormData.BuiltArea,
    //       City: ngFormData.BasicInfo.City,
    //       RTM: ngFormData.RTM, 
    //       Description: ngFormData.Description,
    //       Addresses: reactiveAddressData.Addresses 
    //     };

    //     console.log('Obiectul final: ', newProperty);
    //   };

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

    // if(this.AddressInfo.invalid){
    //   this.formTabs.tabs[2].active = true;
    //   return false;
    // }
     
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
