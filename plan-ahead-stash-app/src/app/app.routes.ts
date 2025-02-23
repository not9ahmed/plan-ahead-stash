import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ManagementComponent } from './pages/management/management.component';
import { AssetsTypeComponent } from './pages/assets-type/assets-type.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {path: 'home', redirectTo: '', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'assetsType', component: AssetsTypeComponent},
    {path: 'users', component: UsersComponent},
    // {path: 'management', component: ManagementComponent, children: [
    //     {path: 'assetsType', component: AssetsTypeComponent},
        
    // ]},
        
    {path: '**', component: PageNotFoundComponent},
];
