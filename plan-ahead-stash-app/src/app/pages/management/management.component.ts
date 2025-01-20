import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-management',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {

}
