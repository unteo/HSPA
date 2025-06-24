import { NgForOf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
@ViewChild('Form') addPropertyForm: NgForm;
 @ViewChild('formTabs') formTabs?: TabsetComponent;

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

   selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

 tmpProp= {}
  constructor(private router : Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createAddressReactiveForm();
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

  onBack()
  {
    this.router.navigate(['/']);
  }

  onSubmit(Form : NgForm){
    console.log('Congrats, form Submitted');
    console.log('SellRent=' + this.addPropertyForm.value.BasicInfo.SellRent);
    console.log(this.addPropertyForm);
    console.log("--------------------");
     console.log('Formularul principal (NgForm) value:', Form.value);
    console.log('Formularul de Adrese (Reactive Form) value:', this.addressReactiveForm.value);

     if (Form.valid && this.addressReactiveForm.valid) {
      const ngFormData = Form.value;
      const reactiveAddressData = this.addressReactiveForm.value;

     const newProperty: Iproperty = {
          Id: 0, 
          SellRent: ngFormData.BasicInfo.SellRent,
          Name: ngFormData.BasicInfo.Name,
          PType: ngFormData.BasicInfo.propType,
          FType: ngFormData.BasicInfo.FType,
          Price: ngFormData.price,
          BHK: ngFormData.BasicInfo.BHK,
          BuiltArea: ngFormData.BuiltArea,
          City: ngFormData.BasicInfo.City,
          RTM: ngFormData.RTM, 
          Description: ngFormData.Description,
          Addresses: reactiveAddressData.Addresses 
        };

      };

  }

}
