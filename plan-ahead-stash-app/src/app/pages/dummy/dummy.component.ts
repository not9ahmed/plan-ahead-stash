import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { AssetsTypeComponent } from "../assets-type/assets-type.component";
import { AddAssetTypeComponent } from '../add-asset-type/add-asset-type.component';
import { FaqComponent } from "../../components/faq/faq.component";


@Component({
  selector: 'app-dummy',
  imports: [CommonModule, ButtonModule, ToastModule, BadgeModule, NavbarComponent, DividerModule, FloatLabelModule, InputTextModule, AssetsTypeComponent, AddAssetTypeComponent, FaqComponent],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.css',
  providers: [MessageService]
})
export class DummyComponent {

  constructor(private messageService: MessageService) { }

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {
        label: 'Documents',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            shortcut: '⌘+N'
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S'
          }
        ]
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O'
          },
          {
            label: 'Messages',
            icon: 'pi pi-inbox',
            badge: '2'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q'
          }
        ]
      },
      {
        separator: true
      }
    ];

 
  }

  show() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
  }




}
