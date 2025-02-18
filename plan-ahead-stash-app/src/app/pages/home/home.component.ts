import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FaqComponent } from '../../components/faq/faq.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AddAssetTypeComponent } from '../add-asset-type/add-asset-type.component';
import { AssetsTypeComponent } from '../assets-type/assets-type.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ButtonModule, ToastModule, BadgeModule, NavbarComponent, DividerModule, FloatLabelModule, InputTextModule, AssetsTypeComponent, AddAssetTypeComponent, FaqComponent, FooterComponent, UsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
