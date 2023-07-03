import { Component } from '@angular/core';
import { LocalStorageService } from './services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Health-Connect';

  constructor(public locaStorage: LocalStorageService) {}
}
