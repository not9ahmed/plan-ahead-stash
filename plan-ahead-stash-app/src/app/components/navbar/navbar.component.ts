import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [MenuModule, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule, RippleModule, ButtonModule, DrawerModule, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    items: MenuItem[] | undefined;

    ngOnInit() {

        let mode = localStorage.getItem("mode");
        if (mode === "dark") {
            this.toggleDarkMode()
        }

        this.items = [
            {
                separator: true
            },
            {
                label: 'Documents',
                items: [
                    {
                        label: 'Users Management',
                        // icon: 'pi pi-plus',
                        url: '/users'
                    },
                    {
                        label: 'Assets Type',
                        // icon: 'pi pi-plus',
                        url: '/assetsType'
                    },
                    {
                        label: 'Portfolio',
                        // icon: 'pi pi-plus',
                        url: '/portfolios'
                    },
                    {
                        label: 'Search',
                        // icon: 'pi pi-search',
                        // shortcut: '⌘+S',
                        url: '/about'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        // icon: 'pi pi-cog',
                        // shortcut: '⌘+O',
                        url: '/about'

                    },
                    {
                        label: 'Logout',
                        // icon: 'pi pi-sign-out',
                        // shortcut: '⌘+Q',
                        url: '/about'

                    }
                ]
            },
            {
                separator: true
            }
        ];
    }

    isDark: boolean = false;

    visible1: boolean = false;

    @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e: any): void {
        this.drawerRef.close(e);
    }

    toggleDarkMode() {
        const element = document.querySelector('html')!;
        element.classList.toggle('my-app-dark');

        this.isDark = !this.isDark;
        let mode: string = this.isDark ? "dark" : "light";
        localStorage.setItem("mode", mode);
    }
}
