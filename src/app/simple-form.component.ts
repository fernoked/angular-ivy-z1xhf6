import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TitleService } from './title.service';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
})
export class SimpleFormComponent implements OnInit, OnDestroy {
  titles$: Observable<string>;
  titleSubscription: Subscription;
  constructor(private titlesService: TitleService) {
    this.titleSubscription = this.titlesService.getTitles().subscribe(() => {});
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
  }
}
