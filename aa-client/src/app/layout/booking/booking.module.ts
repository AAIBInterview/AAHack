import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookingRoutingModule } from './booking-routing.module'
import { BookingComponent } from './booking.component';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    // AngularMultiSelectModule,
  ],
  declarations: [BookingComponent]
})
export class BookingModule { }
