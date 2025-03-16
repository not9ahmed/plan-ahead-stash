import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AssetsTypeComponent } from './pages/assets-type/assets-type.component';
import { UsersComponent } from './pages/users/users.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { AssetsTypeDetailsComponent } from './pages/assets-type-details/assets-type-details.component';
import { PortfolioDetailsComponent } from './pages/portfolio-details/portfolio-details.component';

export const routes: Routes = [
    {path: 'home', redirectTo: '', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    
    {path: 'assetsType', component: AssetsTypeComponent},
    {path: 'assetsType/:id', component: AssetsTypeDetailsComponent},

    {path: 'users', component: UsersComponent},
    
    {path: 'portfolios', component: PortfolioComponent},
    {path: 'portfolios/:id', component: PortfolioDetailsComponent},

    {path: 'assets', component: AssetsComponent},
    // {path: 'management', component: ManagementComponent, children: [
    //     {path: 'assetsType', component: AssetsTypeComponent},
        
    // ]},
        
    {path: '**', component: PageNotFoundComponent},
];
