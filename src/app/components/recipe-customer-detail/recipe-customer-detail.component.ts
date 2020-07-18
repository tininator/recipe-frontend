import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StateService, stateActions } from 'src/app/services/state.service';
import { State } from 'src/app/models/state.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { IngredientStyle } from 'src/app/models/ingredient.interface';
import { RecipebookApiService } from 'src/app/api/recipebook.api.service';
import { RecipeApiService } from 'src/app/api/recipe.api.service';
import { RecipeBook } from 'src/app/models/recipebook.interface';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/login.service';
import { RecipebookService } from 'src/app/services/recipebook.service';

@Component({
  selector: 'app-recipe-customer-detail',
  templateUrl: './recipe-customer-detail.component.html',
  styleUrls: ['./recipe-customer-detail.component.scss']
})
export class RecipeCustomerDetailComponent implements OnInit, OnDestroy {

  public recipeParam: string;
  public recipeBookParam: string;

  public recipe: Recipe;

  public isLoggedIn: boolean;
  private stateSubscription: Subscription;

  constructor(private readonly router: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly recipeBookApi: RecipebookApiService,
              private readonly recipeApi: RecipeApiService,
              private readonly recipeBookService: RecipebookService,
              private readonly loginService: LoginService,
              private readonly stateService: StateService) {
                this.activeRoute.params.subscribe((params: Params) => {
                  this.recipeParam = params['recipe'];
                  console.log(this.recipeParam);
                  this.recipeApi.getRecipeByTitle(this.recipeParam).subscribe((rb: Recipe) => {
                    this.stateService.dispatch(stateActions.setselectedrecipe, rb);
                  }, error => {
                    this.router.navigate(['/recipebooks']);
                  });
                });
                this.activeRoute.parent.params.subscribe((params: Params) => {
                  this.recipeBookParam = params['book'];
                  this.recipeBookApi.getRecipeBookByTitle(this.recipeBookParam).subscribe((rb: RecipeBook) => {
                    this.stateService.dispatch(stateActions.setselectedrecipebook, rb);
                  }, error => this.router.navigate(['/recipebooks']));

                });
    }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe((value: boolean) => {
      this.isLoggedIn = value;
    }, error => console.log('Error fetching logged In state'));
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      if (state.selectedRecipe && state.selectedRecipeBook) {
        this.recipe = state.selectedRecipe;
      }
    });


  }

  public addEditView(): void {
    this.router.navigate(['/recipebooks', this.recipeBookParam, 'recipe', this.recipe.title, 'edit']);
  }

  public ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
    // this.stateService.dispatch(stateActions.unsetselectedrecipe);
    // this.stateService.dispatch(stateActions.unsetselectedrecipe);
  }

}
