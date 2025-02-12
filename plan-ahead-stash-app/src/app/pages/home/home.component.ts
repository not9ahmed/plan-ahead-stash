import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
