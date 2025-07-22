import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExplorarComponent } from './explorar/explorar.component';
import { CadastroComponent } from './cadastro/cadastro.component';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'explorar', component: ExplorarComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: '**', redirectTo: '' }
];
