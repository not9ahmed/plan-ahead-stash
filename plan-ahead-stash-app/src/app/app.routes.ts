import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AssetsTypeComponent } from './pages/assets-type/assets-type.component';
import { UsersComponent } from './pages/users/users.component';
import { PortifolioComponent } from './pages/portifolio/portifolio.component';

export const routes: Routes = [
    {path: 'home', redirectTo: '', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'assetsType', component: AssetsTypeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'portfolios', component: PortifolioComponent},
    // {path: 'management', component: ManagementComponent, children: [
    //     {path: 'assetsType', component: AssetsTypeComponent},
        
    // ]},
        
    {path: '**', component: PageNotFoundComponent},
];
