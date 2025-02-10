import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ManagementComponent } from './pages/management/management.component';
import { AssetsTypeComponent } from './pages/old/assets-type-old/assets-type.component';
import { DummyComponent } from './pages/dummy/dummy.component';

export const routes: Routes = [
    {path: 'home', redirectTo: '', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'management', component: ManagementComponent, children: [
        {path: 'assetsType', component: AssetsTypeComponent},
        
    ]},
    
    {path: 'dummy', component: DummyComponent},
    
    {path: '**', component: PageNotFoundComponent},
];
