import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StateService, stateActions } from 'src/app/services/state.service';
import { State } from 'src/app/models/state.interface';
import { RecipeBook } from 'src/app/models/recipebook.interface';
import { Recipe } from 'src/app/models/recipe.interface';
import { RecipebookService } from 'src/app/services/recipebook.service';
import { RecipebookApiService } from 'src/app/api/recipebook.api.service';
import { LoginService } from 'src/app/core/login.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipebookParam: string;
  recipeBook: RecipeBook;

  editView: boolean = false;
  public isLoggedIn: boolean;

  constructor(private readonly router: Router,
              private readonly activeRoute: ActivatedRoute,
              private readonly recipeBookService: RecipebookService,
              private readonly recipeBookApi: RecipebookApiService,
              private readonly loginService: LoginService,
              private readonly dialogService: DialogService,
              private readonly stateService: StateService) {
                this.activeRoute.params.subscribe((params: Params) => {
                  this.recipebookParam = params['book'];
                });
              }

  ngOnInit() {
    this.loginService.isLoggedIn().then((value: boolean) => {
      this.isLoggedIn = value;
    }).catch(error => console.log(error));
    this.stateService.getState().subscribe((state: State) => {
      if (state && state.selectedRecipeBook) {
        this.recipeBook = state.selectedRecipeBook;
      } else {
        this.recipeBookApi.getRecipeBookByTitle(this.recipebookParam).subscribe((rb: RecipeBook) => {
          this.stateService.dispatch(stateActions.setselectedrecipebook, rb);
        }, error => this.router.navigate(['/recipebooks']));
      }
    });
  }

  public navigateToSpecificRecipe(recipe: Recipe): void {
    this.stateService.dispatch(stateActions.setselectedrecipe, recipe);
    this.router.navigate(['/recipebooks', this.recipebookParam, 'recipe', recipe.title]);
  }

  public navigateToAddView(): void {
    this.stateService.dispatch(stateActions.unsetselectedrecipe);
    this.router.navigate(['/recipebooks', this.recipebookParam, 'recipe', 'create', 'new']);
  }

  public toggleEditView(): void {
    this.editView = true;
  }

  public editTitle(): void {
    this.recipeBookService.editRecipeBookTitle(this.recipeBook.title, this.recipeBook.id);
    this.editView = false;
  }

  public deleteRecipeBook(): void {
    this.dialogService.openDialog('Willst du wirklich das Rezeptbuch mit all seinen Rezepten löschen?').afterClosed().subscribe(result => {
      if (result) {
        this.recipeBookService.deleteRecipeBook(this.recipeBook.id);
        this.stateService.dispatch(stateActions.unsetselectedrecipe);
        this.stateService.dispatch(stateActions.unsetselectedrecipebook);
        this.router.navigate(['/recipebooks']);
      }
    });
  }

}
