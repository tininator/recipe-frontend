import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeCustomerDetailComponent } from './components/recipe-customer-detail/recipe-customer-detail.component';
import { RecipeAdminDetailComponent } from './components/recipe-admin-detail/recipe-admin-detail.component';


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
        component: RecipeListComponent,
        children: [
          {
            path: 'recipe/:recipe',
            pathMatch: 'full',
            component: RecipeCustomerDetailComponent
          },
          {
            path: 'recipe/:recipe/edit',
            pathMatch: 'full',
            component: RecipeAdminDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
