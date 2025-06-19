import { NgForOf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
@ViewChild('Form') addPropertyForm: NgForm;
 @ViewChild('formTabs') formTabs?: TabsetComponent;

 //Will come from masters
 propertyTypes: Array<string> = ['House', 'Apartament', 'Duplex']
 furnishedTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']


 tmpProp= {}
  constructor(private router : Router) { }

  ngOnInit() {
    // this.addPropertyForm.controls['Name'].setValue('Default Value');

    setTimeout(() => {
      this.addPropertyForm.controls['Name'].setValue('Default Value');
    });

  }

  onBack()
  {
    this.router.navigate(['/']);
  }

  onSubmit(Form : NgForm){
    console.log('Congrats, form Submitted');
    console.log(this.addPropertyForm);

  }



   selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }



}


