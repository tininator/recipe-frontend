import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StateService, stateActions } from 'src/app/services/state.service';
import { State } from 'src/app/models/state.interface';
import { Ingredient, IngredientStyle } from 'src/app/models/ingredient.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { RecipebookService } from 'src/app/services/recipebook.service';
import { RecipebookApiService } from 'src/app/api/recipebook.api.service';
import { RecipeApiService } from 'src/app/api/recipe.api.service';
import { RecipeBook } from 'src/app/models/recipebook.interface';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-recipe-admin-detail',
  templateUrl: './recipe-admin-detail.component.html',
  styleUrls: ['./recipe-admin-detail.component.scss']
})
export class RecipeAdminDetailComponent implements OnInit, OnDestroy {

  public recipeForm: FormGroup;
  public ingredientForm: FormGroup;
  public ingredientArray: FormArray;

  public recipeParam: string;
  public recipeBookParam: string;
  public recipe: Recipe;

  public recipebookId: string;
  public selectedRecipeBook: RecipeBook;

  public keys = Object.keys;
  enumtypes = IngredientStyle;

  private stateSubscription: Subscription;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly recipeBookService: RecipebookService,
              private readonly recipeBookApi: RecipebookApiService,
              private readonly recipeApi: RecipeApiService,
              private readonly dialogService: DialogService,
              private readonly stateService: StateService) {
                this.activeRoute.params.subscribe((params: Params) => {
                  this.recipeBookParam = params['book'];
                });
              }

  ngOnInit() {
    this.buildRecipeForm();
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      console.log(state);
      this.selectedRecipeBook = state.selectedRecipeBook;
      if (state.selectedRecipeBook) {
        this.recipebookId = state.selectedRecipeBook.id;
      }

      if (state && !state.selectedRecipeBook) {
        this.router.navigate(['/recipebooks']);
      } else if (state && state.selectedRecipe) {
        this.recipe = state.selectedRecipe;
        this.setRecipeFormValues(this.recipe);
      }
    });
  }

  public buildRecipeForm(): void {
    this.recipeForm = this.formBuilder.group(
      {
        title: this.formBuilder.control(''),
        description: this.formBuilder.control(''),
        notes: this.formBuilder.control(''),
        ingredientList: this.formBuilder.array([])
      }
    );
  }

  public initIngredients(ingredients?: Ingredient[]): void {
    this.ingredientArray = this.recipeForm.get('ingredientList') as FormArray;
    ingredients.forEach((ingr: Ingredient) => {
      this.ingredientArray.push(this.addIngredient(ingr));
    });
  }

  public setRecipeFormValues(recipe: Recipe): void {
    this.recipeForm = this.formBuilder.group(
      {
        title: new FormControl(recipe.title),
        description: new FormControl(recipe.description),
        notes: new FormControl(recipe.notes),
        ingredientList: this.formBuilder.array([
        ])
      }
    );
    this.initIngredients(recipe.ingredientList);
  }

  public addEmptyIngredient(): void {
    this.ingredientArray = this.recipeForm.get('ingredientList') as FormArray;
    const group: FormGroup = this.formBuilder.group(
      {
        amount: [],
        style: [],
        food: this.formBuilder.group(
          {
            name: []
          }
        )
      }
    );
    this.ingredientArray.push(group);
  }

  public addIngredient(ingredient: Ingredient): FormGroup {
    return this.formBuilder.group(
      {
        amount: new FormControl(ingredient.amount),
        style: new FormControl(ingredient.style),
        food: this.formBuilder.group(
          {
            name: new FormControl(ingredient.food.name)
          }
        )
      }
    );
  }

  public deleteIngredient(index: number): void {
    this.ingredientArray.removeAt(index);
  }

  public addRecipe(): void {
    console.log('ADD', this.recipeForm.value);
    this.recipeBookService.addRecipe(this.recipeForm.value, this.recipebookId);
    this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
  }

  public editRecipe(): void {
    console.log('EDIT', this.recipeForm.value);
    this.recipeBookService.editRecipe(this.recipeForm.value, this.recipebookId, this.recipe.id);
    this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
  }

  public deleteRecipe(): void {
    this.dialogService.openDialog('Willst du wirklich das Rezept löschen?').afterClosed().subscribe(result => {
      if (result) {
        this.recipeBookService.deleteRecipe(this.recipebookId, this.recipe.id);
        this.stateService.dispatch(stateActions.unsetselectedrecipe);
        this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
      }
    });
  }

  public return(): void {
    this.router.navigate(['/recipebooks', this.selectedRecipeBook.title]);
  }

  public ngOnDestroy(): void {
    this.stateService.dispatch(stateActions.unsetselectedrecipe);
    this.stateSubscription.unsubscribe();
  }
}
