import { Component } from '@angular/core';
import { ScriptLoaderService } from './webex/script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private scriptLoaderService: ScriptLoaderService
  ) {
    this.scriptLoaderService.load('webexSDK')
      .catch(error => console.log(error));
  }
}
