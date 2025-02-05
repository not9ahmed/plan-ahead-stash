import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dummy',
  imports: [ButtonModule, MenubarModule, ToastModule, AvatarModule],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.css',
  providers: [MessageService]
})
export class DummyComponent {

  constructor(private messageService: MessageService) {}

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
