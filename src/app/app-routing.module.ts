import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCustomerDetailComponent } from './components/recipe-customer-detail/recipe-customer-detail.component';
import { RecipeAdminDetailComponent } from './components/recipe-admin-detail/recipe-admin-detail.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuardService } from './core/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipebooks'
  },
  {
    path: 'recipebooks',
    component: DashboardComponent,
    children: [
      {
        path: ':book',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: RecipeListComponent
          },
          {
            path: 'recipe/create/new',
            pathMatch: 'full',
            component: RecipeAdminDetailComponent,
            canActivate : [AuthGuardService],
            data: { roles: ['admin'] }
          },
          {
            path: 'recipe/:recipe',
            pathMatch: 'full',
            component: RecipeCustomerDetailComponent
          },
          {
            path: 'recipe/:recipe/edit',
            pathMatch: 'full',
            component: RecipeAdminDetailComponent,
            canActivate : [AuthGuardService],
            data: { roles: ['admin'] }
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        component: SidebarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
