import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutRoutingModule } from './layout-routing.module';
import { ComponentsModule } from './components/components.module';
import { LayoutComponent } from './layout.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        FormsModule,
        ComponentsModule,
        DashboardComponent,
        ProfileComponent,
        BookingComponent,

    ],
    declarations: [
        LayoutComponent
    ],
    providers: [NgbActiveModal]
})
export class LayoutModule { }
