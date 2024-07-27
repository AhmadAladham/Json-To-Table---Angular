import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { JsonToTableComponent } from './components/json-to-table/json-to-table.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'json-to-table', component: JsonToTableComponent, canActivate:[AdminRoleGuard] },
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
  ];
