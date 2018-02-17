import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    constructor(public router: Router) { }

    ngOnInit() {
        this.navbar.sidebarClose();
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }

    }

}
