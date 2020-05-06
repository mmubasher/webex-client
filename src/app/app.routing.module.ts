import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './webex/guest/guest.component';
import { PersonComponent } from './webex/people/person.component';

const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GuestComponent
      },
      {
        path: 'person',
        component: PersonComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
