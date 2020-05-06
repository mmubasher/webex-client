import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonComponent } from './webex/people/person.component';
import { GuestComponent } from './webex/guest/guest.component';
import { AppRoutingModule } from './app.routing.module';
import { WebexService } from './webex/webex.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ScriptLoaderService } from './webex/script-loader.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    GuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    WebexService,
    ScriptLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
