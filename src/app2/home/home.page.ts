import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  timeplans$: Observable<any>;
  constructor(
    private store: Store<{ timeevent: any, }>
  ) { 
    this.timeplans$ = store.select('timeevent');
  }

  ngOnInit() {
  }

}
