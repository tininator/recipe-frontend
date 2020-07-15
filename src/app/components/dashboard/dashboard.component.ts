import { Component, OnInit } from '@angular/core';
import { RecipebookService } from 'src/app/services/recipebook.service';
import { RecipeBook } from 'src/app/models/recipebook.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { StateService, stateActions } from 'src/app/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public recipeBooks: RecipeBook[];

  constructor(private recipebookService: RecipebookService,
              private stateService: StateService,
              private router: Router) { }

  ngOnInit() {
    this.recipebookService.recipeBooks$.subscribe((rb: RecipeBook[]) => {
      this.recipeBooks = rb;
    });
  }

  public navigateToListOfRecipes(recipeBook: RecipeBook): void {
    this.stateService.dispatch(stateActions.setselectedrecipebook, recipeBook);
    this.router.navigate(['/recipebooks', recipeBook.title]);
  }

  public navigateToSpecificRecipe(recipeBook: RecipeBook, recipe: Recipe): void {
    this.stateService.dispatch(stateActions.setselectedrecipebook, recipeBook);
    this.stateService.dispatch(stateActions.setselectedrecipe, recipe);
    this.router.navigate(['/recipebooks', recipeBook.title, 'recipe', recipe.title]);
  }

}
