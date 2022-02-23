import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  panelOpenState = false;
  panelOpenStateProspect = false;
  panelOpenStateAnalytics = false;
  panelOpenStateIntigration = false;

  constructor() { }

  ngOnInit(): void {
  }

}
