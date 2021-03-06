import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from './title.model';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent implements OnInit, OnDestroy {
  titles: Title[];
  titleSubscription: Subscription;
  testFormGroup = new FormGroup({
    title: new FormControl(),
    firstName: new FormControl(''),
    lastName: new FormControl('', [Validators.required]),
    terms: new FormControl(false),
  });
  errorMessage: string;
  constructor(private titlesService: TitleService) {
    this.titleSubscription = this.titlesService
      .getTitles()
      .pipe(map((data) => this.removedByBeChickAndGetDefaultAndSort(data)))
      .subscribe((x) => {
        this.titles = x;
      });
  }
  ngOnInit(): void {
    this.errorMessage = '* Last name is mandatory';
  }

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
  }

  private removedByBeChickAndGetDefaultAndSort(val: Title[]): Title[] {
    const defaultTitle: Title = val.find((title) => title.isDefault === true);
    this.testFormGroup.controls['title'].setValue(defaultTitle.name);
    return val
      .filter((title) => title.name !== '!')
      .sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
  }

  formSubmit(): void {
    if (this.testFormGroup.valid) {
      console.log(
        `${this.testFormGroup.controls['title'].value} ${this.testFormGroup.controls['firstName'].value} ${this.testFormGroup.controls['lastName'].value} `
      );
    } else {
      this.testFormGroup.get('lastName').markAsTouched();
    }
  }
}
