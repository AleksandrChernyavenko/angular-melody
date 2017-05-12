import {Component} from '@angular/core';
import AdventureService from "./AdventureService";

@Component({
  selector: 'adventure',
  styleUrls: ['adventure.component.css'],
  templateUrl: 'adventure.component.html',
  providers:[
    AdventureService
  ]
})
export class AdventureComponent {
}
